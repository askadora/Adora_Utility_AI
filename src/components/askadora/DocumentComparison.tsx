'use client';

import React, { useState, useEffect } from 'react';
import { GitCompare, BarChart3, FileText, AlertCircle, Loader2, X } from 'lucide-react';

interface Document {
  id: number;
  filename: string;
  file_type: string;
  processed: boolean;
}

interface ComparisonResult {
  success: boolean;
  type?: string;
  data?: any;
  error?: string;
}

interface DocumentComparisonProps {
  documents: Document[];
  isOpen: boolean;
  onClose: () => void;
  apiBaseUrl?: string;
}

const DocumentComparison: React.FC<DocumentComparisonProps> = ({
  documents,
  isOpen,
  onClose,
  apiBaseUrl = 'http://localhost:5000/api'
}) => {
  const [selectedDoc1, setSelectedDoc1] = useState<number | null>(null);
  const [selectedDoc2, setSelectedDoc2] = useState<number | null>(null);
  const [comparisonQuery, setComparisonQuery] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const processedDocuments = documents.filter(doc => doc.processed);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setSelectedDoc1(null);
      setSelectedDoc2(null);
      setComparisonQuery('');
      setResult(null);
    }
  }, [isOpen]);

  const handleCompare = async () => {
    if (!selectedDoc1 || !selectedDoc2 || selectedDoc1 === selectedDoc2) {
      setResult({
        success: false,
        error: 'Please select two different documents to compare'
      });
      return;
    }

    setIsComparing(true);
    setResult(null);

    try {
      const response = await fetch(`${apiBaseUrl}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document1_id: selectedDoc1,
          document2_id: selectedDoc2,
          query: comparisonQuery.trim()
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({
        success: false,
        error: 'Network error occurred during comparison'
      });
      console.error('Comparison error:', err);
    } finally {
      setIsComparing(false);
    }
  };

  const renderComparisonResult = () => {
    if (!result) return null;

    if (!result.success) {
      return (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-sm text-red-700 dark:text-red-300">{result.error}</p>
          </div>
        </div>
      );
    }

    const { data } = result;

    return (
      <div className="mt-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comparison Results
        </h3>

        {/* Visualization */}
        {data?.visualization && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Comparative Visualization
            </h4>
            <div 
              className="w-full h-96 bg-gray-50 dark:bg-gray-900 rounded border"
              dangerouslySetInnerHTML={{ __html: data.visualization }}
            />
          </div>
        )}

        {/* Summary */}
        {data?.summary && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="text-md font-medium text-blue-900 dark:text-blue-100 mb-2">
              Comparison Summary
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-wrap">
              {data.summary}
            </p>
          </div>
        )}

        {/* Detailed Comparisons */}
        {data?.comparisons && Array.isArray(data.comparisons) && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
              Detailed Analysis
            </h4>
            {data.comparisons.map((comparison: any, index: number) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  {comparison.column || `Comparison ${index + 1}`}
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File 1 Stats */}
                  {comparison.file1 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {comparison.file1.filename || 'Document 1'}
                      </h6>
                      <div className="space-y-1">
                        {Object.entries(comparison.file1.stats || {}).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace('_', ' ')}:
                            </span>
                            <span className="text-gray-900 dark:text-gray-100">
                              {typeof value === 'number' ? value.toFixed(2) : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File 2 Stats */}
                  {comparison.file2 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {comparison.file2.filename || 'Document 2'}
                      </h6>
                      <div className="space-y-1">
                        {Object.entries(comparison.file2.stats || {}).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace('_', ' ')}:
                            </span>
                            <span className="text-gray-900 dark:text-gray-100">
                              {typeof value === 'number' ? value.toFixed(2) : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Differences */}
                {comparison.differences && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key Differences
                    </h6>
                    <div className="space-y-1">
                      {Object.entries(comparison.differences).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400 capitalize">
                            {key.replace('_', ' ')}:
                          </span>
                          <span className="text-gray-900 dark:text-gray-100">
                            {typeof value === 'number' ? value.toFixed(2) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Metrics */}
        {data?.metrics && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="text-md font-medium text-green-900 dark:text-green-100 mb-2">
              Comparison Metrics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(data.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                    {typeof value === 'number' ? value.toFixed(2) : value}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 capitalize">
                    {key.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <GitCompare className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Compare Documents
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {processedDocuments.length < 2 ? (
            <div className="text-center py-8">
              <GitCompare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Not enough documents
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                You need at least 2 processed documents to compare
              </p>
            </div>
          ) : (
            <>
              {/* Document Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Document
                  </label>
                  <div className="space-y-2">
                    {processedDocuments.map((doc) => (
                      <label key={doc.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="document1"
                          value={doc.id}
                          checked={selectedDoc1 === doc.id}
                          onChange={(e) => setSelectedDoc1(Number(e.target.value))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                            {doc.filename}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Second Document
                  </label>
                  <div className="space-y-2">
                    {processedDocuments.map((doc) => (
                      <label key={doc.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="document2"
                          value={doc.id}
                          checked={selectedDoc2 === doc.id}
                          onChange={(e) => setSelectedDoc2(Number(e.target.value))}
                          className="text-blue-600 focus:ring-blue-500"
                          disabled={selectedDoc1 === doc.id}
                        />
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className={`text-sm truncate ${
                            selectedDoc1 === doc.id
                              ? 'text-gray-400 dark:text-gray-600'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {doc.filename}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comparison Query */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comparison Focus (Optional)
                </label>
                <textarea
                  value={comparisonQuery}
                  onChange={(e) => setComparisonQuery(e.target.value)}
                  placeholder="e.g., 'Compare revenue trends' or 'Show differences in performance metrics'"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  rows={2}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Leave empty for general comparison
                </p>
              </div>

              {/* Compare Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleCompare}
                  disabled={!selectedDoc1 || !selectedDoc2 || selectedDoc1 === selectedDoc2 || isComparing}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isComparing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Comparing...</span>
                    </>
                  ) : (
                    <>
                      <GitCompare className="w-4 h-4" />
                      <span>Compare Documents</span>
                    </>
                  )}
                </button>
              </div>

              {/* Results */}
              {renderComparisonResult()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentComparison;