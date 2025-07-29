'use client';

import React, { useState, useCallback } from 'react';
import { FileText, GitCompare, MessageSquare, Settings } from 'lucide-react';
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';
import ChatInterface from './ChatInterface';
import DocumentComparison from './DocumentComparison';

interface Document {
  id: number;
  filename: string;
  file_type: string;
  file_size: number;
  processed: boolean;
  processing_status: string;
  created_at: string;
}

interface AskAdoraAppProps {
  apiBaseUrl?: string;
  className?: string;
}

const AskAdoraApp: React.FC<AskAdoraAppProps> = ({
  apiBaseUrl = 'http://localhost:5000/api',
  className = ''
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'documents' | 'chat'>('upload');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = useCallback((document: Document) => {
    setDocuments(prev => [document, ...prev]);
    setRefreshTrigger(prev => prev + 1);
    
    // Switch to documents tab to show the uploaded document
    setActiveTab('documents');
  }, []);

  const handleDocumentSelect = useCallback((document: Document) => {
    setSelectedDocument(document);
    setActiveTab('chat');
  }, []);

  const handleDocumentDelete = useCallback((documentId: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    
    // If the deleted document was selected, clear selection
    if (selectedDocument?.id === documentId) {
      setSelectedDocument(null);
      setActiveTab('documents');
    }
  }, [selectedDocument]);

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className={`bg-white dark:bg-gray-900 min-h-screen ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  AskAdora
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI-Powered Document Analysis
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Compare Button */}
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Compare Documents"
              >
                <GitCompare className="w-4 h-4" />
                <span>Compare</span>
              </button>

              {/* Settings Button (placeholder) */}
              <button
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Upload Document
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Documents ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
              {selectedDocument && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                  {selectedDocument.filename.substring(0, 15)}
                  {selectedDocument.filename.length > 15 ? '...' : ''}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Upload Your Document
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upload documents to start analyzing them with AI. Supported formats include PDF, DOCX, XLSX, XLS, TXT, and CSV.
              </p>
            </div>
            
            <DocumentUpload
              onUploadSuccess={handleUploadSuccess}
              apiBaseUrl={apiBaseUrl}
            />

            {/* Recent Documents Preview */}
            {documents.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Recent Documents
                </h3>
                <div className="grid gap-3">
                  {documents.slice(0, 3).map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          {doc.filename}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          doc.processed
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {doc.processed ? 'Ready' : 'Processing'}
                        </span>
                      </div>
                      {doc.processed && (
                        <button
                          onClick={() => handleDocumentSelect(doc)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          Start Chat →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('documents')}
                  className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  View all documents →
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <DocumentList
              onDocumentSelect={handleDocumentSelect}
              onDocumentDelete={handleDocumentDelete}
              refreshTrigger={refreshTrigger}
              apiBaseUrl={apiBaseUrl}
            />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-[calc(100vh-200px)]">
            <ChatInterface
              document={selectedDocument}
              apiBaseUrl={apiBaseUrl}
            />
          </div>
        )}
      </div>

      {/* Document Comparison Modal */}
      <DocumentComparison
        documents={documents}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        apiBaseUrl={apiBaseUrl}
      />
    </div>
  );
};

export default AskAdoraApp;