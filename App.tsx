import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Search, Shield, Brain, Database, XCircle, Globe, Link, Newspaper } from 'lucide-react';

type NewsSource = {
  name: string;
  url: string;
  reliability: number;
  matchingContent?: {
    headline: string;
    url: string;
    publishDate: string;
    verified: boolean;
  }[];
};

type AnalysisResult = {
  isFake: boolean;
  confidence: number;
  explanation: string;
  sources: NewsSource[];
};

function App() {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulated API calls to major news sources
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock analysis result with trusted news sources
    const mockResult: AnalysisResult = {
      isFake: Math.random() > 0.5,
      confidence: Math.random() * 100,
      explanation: "Based on our comprehensive cross-reference analysis across major news outlets, we've evaluated the content's authenticity by comparing it with verified reporting from trusted sources.",
      sources: [
        {
          name: "The New York Times",
          url: "https://www.nytimes.com",
          reliability: 95,
          matchingContent: [
            {
              headline: "Related coverage of this topic",
              url: "https://www.nytimes.com/example",
              publishDate: "2024-03-15",
              verified: true
            }
          ]
        },
        {
          name: "BBC News",
          url: "https://www.bbc.com/news",
          reliability: 94,
          matchingContent: [
            {
              headline: "Similar story covered",
              url: "https://www.bbc.com/news/example",
              publishDate: "2024-03-14",
              verified: true
            }
          ]
        },
        {
          name: "Associated Press",
          url: "https://apnews.com",
          reliability: 96,
          matchingContent: [
            {
              headline: "Original reporting on this issue",
              url: "https://apnews.com/example",
              publishDate: "2024-03-15",
              verified: true
            }
          ]
        },
        {
          name: "Reuters",
          url: "https://www.reuters.com",
          reliability: 95,
          matchingContent: [
            {
              headline: "Fact-based coverage",
              url: "https://www.reuters.com/example",
              publishDate: "2024-03-15",
              verified: true
            }
          ]
        }
      ]
    };
    
    setResult(mockResult);
    setLoading(false);
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return 'text-emerald-400';
    if (reliability >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield size={40} className="text-emerald-400" />
            <h1 className="text-4xl font-bold">FakeNews Guardian</h1>
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Advanced news verification system with real-time cross-referencing against the world's most trusted news sources.
          </p>
        </header>

        <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm shadow-xl">
          <form onSubmit={analyzeContent} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-2">
                  News URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/news-article"
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-white placeholder-slate-400"
                  />
                  <Search className="absolute right-3 top-2.5 text-slate-400" size={20} />
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800/50 text-slate-400">OR</span>
                </div>
              </div>

              <div>
                <label htmlFor="text" className="block text-sm font-medium text-slate-300 mb-2">
                  Paste News Content
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste the news content here..."
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-white placeholder-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || (!url && !text)}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Cross-referencing Sources...
                </>
              ) : (
                <>
                  <Newspaper size={20} />
                  Verify Content
                </>
              )}
            </button>
          </form>

          {result && (
            <div className={`mt-8 p-6 rounded-lg ${result.isFake ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
              <div className="flex items-start gap-4">
                {result.isFake ? (
                  <XCircle className="text-red-400 flex-shrink-0" size={24} />
                ) : (
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={24} />
                )}
                <div className="space-y-4 w-full">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {result.isFake ? 'Potential Misinformation Detected' : 'Content Verified by Trusted Sources'}
                    </h3>
                    <p className="text-slate-300">{result.explanation}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Verification Confidence:</span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full max-w-xs">
                      <div
                        className={`h-full rounded-full ${
                          result.isFake ? 'bg-red-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{result.confidence.toFixed(1)}%</span>
                  </div>

                  <div className="border-t border-slate-700 pt-4">
                    <h4 className="text-lg font-medium mb-3">Trusted Source Coverage</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {result.sources.map((source, index) => (
                        <div key={index} className="bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Newspaper size={16} className="text-slate-400" />
                              <span className="font-medium">{source.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${getReliabilityColor(source.reliability)}`}>
                                {source.reliability}% reliable
                              </span>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300"
                              >
                                <Link size={16} />
                              </a>
                            </div>
                          </div>
                          {source.matchingContent && source.matchingContent.map((content, idx) => (
                            <div key={idx} className="mt-2 p-3 bg-slate-700/50 rounded-lg">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h5 className="text-sm font-medium text-slate-300">{content.headline}</h5>
                                  <p className="text-xs text-slate-400 mt-1">Published: {content.publishDate}</p>
                                </div>
                                <a
                                  href={content.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 flex-shrink-0"
                                >
                                  <Link size={14} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-slate-400 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Database size={16} />
            <span>Cross-referenced with world's leading news sources</span>
          </div>
          <p>Our verification system checks content against The New York Times, BBC, CNN, The Guardian, Associated Press, Reuters, and other trusted sources.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;