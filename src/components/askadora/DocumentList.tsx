'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Trash2, MessageSquare, BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Document {
  id: number;
  filename: string;
  file_type: string;
  file_size: number;
  processed: boolean;
  processing_status: string;
  created_at: string;
}

interface DocumentListProps {
  onDocumentSelect?: (document: Document) => void;
  onDocumentDelete?: (documentId: number) => void;
  refreshTrigger?: number;
  apiBaseUrl?: string;
}

const DocumentList: React.FC<DocumentListProps> = ({
  onDocumentSelect,
  onDocumentDelete,
  refreshTrigger,
  apiBaseUrl = 'http://localhost:5000/api'
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/documents`);
      const result = await response.json();

      if (result.success) {
        setDocuments(result.documents);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch documents');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [apiBaseUrl, refreshTrigger]);

  const handleDelete = async (documentId: number, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(documentId);
    try {
      const response = await fetch(`${apiBaseUrl}/documents/${documentId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        if (onDocumentDelete) {
          onDocumentDelete(documentId);
        }
      } else {
        setError(result.error || 'Failed to delete document');
      }
    } catch (err) {
      setError('Network error occurred during deletion');
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileType: string) => {
    const iconClass = "w-8 h-8";
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className={`${iconClass} text-red-500`} />;
      case 'docx':
      case 'doc':
        return <FileText className={`${iconClass} text-blue-500`} />;
      case 'xlsx':
      case 'xls':
        return <BarChart3 className={`${iconClass} text-green-500`} />;
      case 'csv':
        return <BarChart3 className={`${iconClass} text-orange-500`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  const getStatusIcon = (processed: boolean, status: string) => {
    if (processed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (status === 'processing') {
      return (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          <Clock className="w-4 h-4 text-blue-500" />
        </div>
      );
    } else if (status === 'failed') {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading documents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
        <button
          onClick={fetchDocuments}
          className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No documents uploaded yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Upload your first document to get started with AI-powered analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Your Documents ({documents.length})
      </h2>
      
      <div className="grid gap-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                {getFileIcon(document.file_type)}
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {document.filename}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(document.file_size)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(document.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Status Indicator */}
                <div className="flex items-center space-x-1">
                  {getStatusIcon(document.processed, document.processing_status)}
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {document.processed ? 'Ready' : document.processing_status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {document.processed && onDocumentSelect && (
                    <button
                      onClick={() => onDocumentSelect(document)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                      title="Start chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(document.id, document.filename)}
                    disabled={deletingId === document.id}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete document"
                  >
                    {deletingId === document.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Processing Status Bar */}
            {!document.processed && document.processing_status === 'processing' && (
              <div className="mt-3">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Processing document for AI analysis...
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;