import apiClient from '../lib/axios';
import type { CodeReviewRequest, CodeReviewResult } from '../types';

type Severity = 'ERROR' | 'WARNING' | 'INFO';

type BackendCodeReview = {
  id?: string | number;
  title?: string;
  codeContent?: string;
  programmingLanguage?: string;
  contextDescription?: string;
  reviewSummary?: string;
  detectedIssues?: string;
  improvementSuggestions?: string;
  securityObservations?: string;
  optimizationSuggestions?: string;
  improvedCode?: string;
  qualityScore?: number;
  isProcessed?: boolean;
  createdAt?: string;
};

type ParsedIssue = {
  severity: Severity;
  message: string;
  line?: number;
  suggestion?: string;
};

function cleanItem(value: string): string {
  return value
    .replace(/^[-•*]\s*/, '')
    .replace(/^\d+[\).]\s*/, '')
    .replace(/^#+\s*/, '')
    .trim();
}

function splitText(value?: string): string[] {
  if (!value) return [];

  return value
    .split(/\n+/)
    .map(cleanItem)
    .filter((item) => item.length > 0)
    .filter((item) => !/^```/.test(item))
    .filter((item) => !/^issues:?$/i.test(item))
    .filter((item) => !/^improvements:?$/i.test(item))
    .filter((item) => !/^security:?$/i.test(item))
    .filter((item) => !/^optimization:?$/i.test(item));
}

function detectSeverity(message: string): Severity {
  const lower = message.toLowerCase();

  if (
    lower.includes('syntax error') ||
    lower.includes('type error') ||
    lower.includes('type mismatch') ||
    lower.includes('exception') ||
    lower.includes('vulnerability') ||
    lower.includes('security risk') ||
    lower.includes('does not compile') ||
    lower.includes('compilation error')
  ) {
    return 'ERROR';
  }

  if (
    lower.includes('warning') ||
    lower.includes('missing') ||
    lower.includes('unused') ||
    lower.includes('should') ||
    lower.includes('consider') ||
    lower.includes('best practice') ||
    lower.includes('out of bounds')
  ) {
    return 'WARNING';
  }

  return 'INFO';
}

function extractLineNumber(message: string): number | undefined {
  const match = message.match(/line\s+(\d+)/i);
  return match ? Number(match[1]) : undefined;
}

function parseIssues(text?: string): ParsedIssue[] {
  return splitText(text).map((message) => ({
    severity: detectSeverity(message),
    message,
    line: extractLineNumber(message),
  }));
}

function extractSection(source: string, startLabels: string[], endLabels: string[]): string {
  const lower = source.toLowerCase();

  let startIndex = -1;
  let usedLabelLength = 0;

  for (const label of startLabels) {
    const index = lower.indexOf(label.toLowerCase());
    if (index !== -1 && (startIndex === -1 || index < startIndex)) {
      startIndex = index;
      usedLabelLength = label.length;
    }
  }

  if (startIndex === -1) return '';

  const contentStart = startIndex + usedLabelLength;
  let endIndex = source.length;

  for (const label of endLabels) {
    const index = lower.indexOf(label.toLowerCase(), contentStart);
    if (index !== -1 && index < endIndex) {
      endIndex = index;
    }
  }

  return source.substring(contentStart, endIndex).trim();
}

function extractScoreFromText(text?: string): number | undefined {
  if (!text) return undefined;

  const patterns = [
    /score\s*(?:of)?\s*[:\-]?\s*(\d{1,3})\s*\/\s*100/i,
    /(\d{1,3})\s*\/\s*100/i,
    /score\s*(?:of)?\s*[:\-]?\s*(\d{1,3})/i,
    /(\d{1,3})\s*out\s*of\s*100/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const score = Number(match[1]);
      if (!Number.isNaN(score)) {
        return Math.max(0, Math.min(100, score));
      }
    }
  }

  return undefined;
}

function normalizeBackendReview(data: BackendCodeReview): CodeReviewResult {
  const fullText = data.reviewSummary || '';

  const issuesText =
    data.detectedIssues ||
    extractSection(fullText, ['### Issues', '## Issues', 'Issues'], [
      '### Improvements',
      '## Improvements',
      'Improvements',
      '### Security',
      '## Security',
      'Security',
      '### Optimization',
      '## Optimization',
      'Optimization',
      '### Score',
      '## Score',
      'Score',
    ]);

  const improvementsText =
    data.improvementSuggestions ||
    extractSection(fullText, ['### Improvements', '## Improvements', 'Improvements'], [
      '### Security',
      '## Security',
      'Security',
      '### Optimization',
      '## Optimization',
      'Optimization',
      '### Score',
      '## Score',
      'Score',
    ]);

  const securityText =
    data.securityObservations ||
    extractSection(fullText, ['### Security', '## Security', 'Security'], [
      '### Optimization',
      '## Optimization',
      'Optimization',
      '### Score',
      '## Score',
      'Score',
    ]);

  const optimizationText =
    data.optimizationSuggestions ||
    extractSection(fullText, ['### Optimization', '## Optimization', 'Optimization'], [
      '### Score',
      '## Score',
      'Score',
    ]);

  const parsedIssues = parseIssues(issuesText);
  const parsedImprovements = splitText(improvementsText);
  const parsedSecurity = splitText(securityText);
  const parsedOptimizations = splitText(optimizationText);

  return {
    id: String(data.id ?? Date.now()),
    summary: fullText || 'Code review completed.',
    score: data.qualityScore ?? extractScoreFromText(fullText) ?? 70,
    issues: parsedIssues,
    improvements: parsedImprovements,
    optimizations: parsedOptimizations,
    securityNotes: parsedSecurity,
    createdAt: data.createdAt || new Date().toISOString(),
  };
}

function normalizeReview(data: BackendCodeReview | CodeReviewResult): CodeReviewResult {
  const maybeResult = data as CodeReviewResult;

  if (
    'summary' in maybeResult &&
    'score' in maybeResult &&
    'issues' in maybeResult
  ) {
    return maybeResult;
  }

  return normalizeBackendReview(data as BackendCodeReview);
}

export const codeReviewService = {
  submitReview: async (data: CodeReviewRequest): Promise<CodeReviewResult> => {
    const response = await apiClient.post('/ai/code-review', {
      title: data.title || 'Code Review',
      codeContent: data.code,
      programmingLanguage: data.language,
      contextDescription: data.context || '',
    });

    return normalizeReview(response.data as BackendCodeReview | CodeReviewResult);
  },

  getReviewHistory: async (): Promise<CodeReviewResult[]> => {
    const response = await apiClient.get('/ai/code-review');
    const content = response.data?.content ?? response.data ?? [];

    return Array.isArray(content)
      ? content.map((item) =>
          normalizeReview(item as BackendCodeReview | CodeReviewResult)
        )
      : [];
  },

  getReview: async (id: string): Promise<CodeReviewResult> => {
    const response = await apiClient.get(`/ai/code-review/${id}`);
    return normalizeReview(response.data as BackendCodeReview | CodeReviewResult);
  },

  deleteReview: async (id: string): Promise<void> => {
    await apiClient.delete(`/ai/code-review/${id}`);
  },
};

export default codeReviewService;