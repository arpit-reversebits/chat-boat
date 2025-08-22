
import { useState } from 'react';
import { Plus, Bot, User, Send, MessageCircle, Settings, X, Upload, FileText, Check, ArrowLeft } from 'lucide-react';

export default function ChatbotDashboard() {
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', systemPrompt: '' });
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const chatbots = [
    { id: 1, name: 'Customer Support Bot', description: 'Handles customer inquiries', status: 'active' },
    { id: 2, name: 'Sales Assistant', description: 'Helps with product recommendations', status: 'active' },
    { id: 3, name: 'FAQ Bot', description: 'Answers frequently asked questions', status: 'inactive' },
    { id: 4, name: 'Technical Support', description: 'Provides technical assistance', status: 'active' },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `Thanks for your message! This is a response from ${selectedChatbot.name}.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const selectChatbot = (chatbot) => {
    setSelectedChatbot(chatbot);
    setMessages([
      {
        id: 1,
        text: `Hello! I'm ${chatbot.name}. How can I help you today?`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleFileUpload = (newFiles) => {
    const fileArray = Array.from(newFiles);
    setFiles(prev => [...prev, ...fileArray]);
  };
  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragleave' || e.type === 'dragover') setDragActive(e.type !== 'dragleave');
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files);
  };
  const handleCreateSubmit = () => {
    if (!formData.name.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      alert('Chatbot created successfully!');
      setIsLoading(false);
      setFormData({ name: '', description: '', systemPrompt: '' });
      setFiles([]);
      setShowCreateForm(false);
    }, 2000);
  };
  const isFormValid = formData.name.trim() && formData.systemPrompt.trim();
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="dashboard-bg">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Company's Name</h1>
          <p className="sidebar-subtitle">Chatbot Dashboard</p>
        </div>
        <div className="sidebar-create">
          <button onClick={() => setShowCreateForm(true)} className="sidebar-create-btn">
            <Plus className="sidebar-create-icon" />
            Create New Chatbot
          </button>
        </div>
        <div className="sidebar-list">
          <h3 className="sidebar-list-title">Your Chatbots</h3>
          {chatbots.map((chatbot) => (
            <div
              key={chatbot.id}
              onClick={() => selectChatbot(chatbot)}
              className={`sidebar-chatbot-item${selectedChatbot?.id === chatbot.id ? ' selected' : ''}${chatbot.status !== 'active' ? ' inactive' : ''}`}
            >
              <div className="sidebar-chatbot-icon-wrap">
                <Bot className="sidebar-chatbot-icon" />
              </div>
              <div className="sidebar-chatbot-info">
                <h4 className="sidebar-chatbot-name">{chatbot.name}</h4>
                <p className="sidebar-chatbot-desc">{chatbot.description}</p>
                <div className="sidebar-chatbot-status-wrap">
                  <div className={`sidebar-chatbot-status-dot${chatbot.status === 'active' ? ' active' : ''}`}></div>
                  <span className="sidebar-chatbot-status-text">{chatbot.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar-profile">
          <div className="sidebar-profile-card">
            <div className="sidebar-profile-avatar">
              <User className="sidebar-profile-avatar-icon" />
            </div>
            <div className="sidebar-profile-info">
              <p className="sidebar-profile-name">John Doe</p>
              <p className="sidebar-profile-email">john@example.com</p>
            </div>
            <Settings className="sidebar-profile-settings" />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="dashboard-main">
        {!selectedChatbot ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon-wrap">
              <MessageCircle className="dashboard-empty-icon" />
            </div>
            <h2 className="dashboard-empty-title">No Chatbot Selected</h2>
            <p className="dashboard-empty-desc">Select a chatbot from the sidebar to start chatting, or create a new one to get started.</p>
          </div>
        ) : (
          <>
            <div className="dashboard-chat-header">
              <div className="dashboard-chat-header-icon-wrap">
                <Bot className="dashboard-chat-header-icon" />
              </div>
              <div>
                <h2 className="dashboard-chat-header-title">{selectedChatbot.name}</h2>
                <p className="dashboard-chat-header-desc">{selectedChatbot.description}</p>
              </div>
            </div>
            <div className="dashboard-chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`dashboard-chat-message-row${msg.sender === 'user' ? ' user' : ' bot'}`}> 
                  <div className={`dashboard-chat-message${msg.sender === 'user' ? ' user' : ' bot'}`}> 
                    <p className="dashboard-chat-message-text">{msg.text}</p>
                    <p className="dashboard-chat-message-time">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="dashboard-chat-input-wrap">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="dashboard-chat-input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="dashboard-chat-send-btn"
              >
                <Send className="dashboard-chat-send-icon" />
              </button>
            </div>
          </>
        )}
      </div>
      {/* Create Chatbot Modal */}
      {showCreateForm && (
        <div className="dashboard-modal-bg">
          <div className="dashboard-modal">
            <div className="dashboard-modal-header">
              <div>
                <h2 className="dashboard-modal-title">Create New Chatbot</h2>
                <p className="dashboard-modal-desc">Configure your custom chatbot with AI capabilities</p>
              </div>
              <button onClick={() => setShowCreateForm(false)} className="dashboard-modal-close-btn">
                <X className="dashboard-modal-close-icon" />
              </button>
            </div>
            <div className="dashboard-modal-content">
              <div className="dashboard-modal-columns">
                <div className="dashboard-modal-col">
                  <div className="dashboard-modal-form-group">
                    <label className="dashboard-modal-label">Chatbot Name *</label>
                    <div className="dashboard-modal-input-icon-wrap">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter chatbot name"
                        className="dashboard-modal-input"
                      />
                      <Bot className="dashboard-modal-input-icon" />
                    </div>
                  </div>
                  <div className="dashboard-modal-form-group">
                    <label className="dashboard-modal-label">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe what your chatbot does... (optional)"
                      rows={4}
                      className="dashboard-modal-input"
                    />
                  </div>
                  <div className="dashboard-modal-form-group">
                    <label className="dashboard-modal-label">System Prompt *</label>
                    <textarea
                      value={formData.systemPrompt}
                      onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
                      placeholder="You are a helpful assistant that..."
                      rows={6}
                      className="dashboard-modal-input"
                    />
                    <p className="dashboard-modal-tip">Define how your chatbot should behave and respond to users</p>
                  </div>
                </div>
                <div className="dashboard-modal-col">
                  <div className="dashboard-modal-form-group">
                    <label className="dashboard-modal-label">Knowledge Base Files</label>
                    <div
                      className={`dashboard-modal-dropzone${dragActive ? ' active' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="dashboard-modal-dropzone-icon" />
                      <p className="dashboard-modal-dropzone-title">Drag & drop files here, or click to select</p>
                      <p className="dashboard-modal-dropzone-desc">Support for PDF, TXT, DOC, and other text files</p>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="dashboard-modal-dropzone-input"
                        id="file-upload"
                        accept=".pdf,.txt,.doc,.docx,.md"
                      />
                      <label htmlFor="file-upload" className="dashboard-modal-dropzone-btn">
                        <Upload className="dashboard-modal-dropzone-btn-icon" />
                        Choose Files
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="dashboard-modal-files-list">
                        <h4 className="dashboard-modal-files-title">Uploaded Files ({files.length})</h4>
                        <div className="dashboard-modal-files-items">
                          {files.map((file, index) => (
                            <div key={index} className="dashboard-modal-file-item">
                              <FileText className="dashboard-modal-file-icon" />
                              <div className="dashboard-modal-file-info">
                                <p className="dashboard-modal-file-name">{file.name}</p>
                                <p className="dashboard-modal-file-size">{formatFileSize(file.size)}</p>
                              </div>
                              <button onClick={() => removeFile(index)} className="dashboard-modal-file-remove-btn">
                                <X className="dashboard-modal-file-remove-icon" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="dashboard-modal-tips">
                    <div className="dashboard-modal-tip-box indigo">
                      <h4 className="dashboard-modal-tip-title">System Prompt Tips</h4>
                      <p className="dashboard-modal-tip-desc">Be specific about the chatbot's role, tone, and how it should respond to users.</p>
                    </div>
                    <div className="dashboard-modal-tip-box purple">
                      <h4 className="dashboard-modal-tip-title">File Formats</h4>
                      <p className="dashboard-modal-tip-desc">Upload PDF, TXT, DOC, DOCX, or MD files to build your knowledge base.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-modal-actions">
                <button onClick={() => setShowCreateForm(false)} className="dashboard-modal-cancel-btn">Cancel</button>
                <button onClick={handleCreateSubmit} disabled={!isFormValid || isLoading} className="dashboard-modal-create-btn">
                  {isLoading ? (<><div className="dashboard-modal-spinner" />Creating...</>) : (<><Check className="dashboard-modal-create-icon" />Create Chatbot</>)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
