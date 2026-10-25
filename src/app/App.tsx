import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ScamDetector } from './components/ScamDetector';
import { EducationalTips } from './components/EducationalTips';
import { ImageScamDetector } from './components/ImageScamDetector';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { Shield, Search, BookOpen, Target, ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';

export default function App() {
  const [activeTab, setActiveTab] = useState('detector');

  return (
    <div className="min-h-screen gradient-bg relative">
      <div className="container mx-auto py-4 sm:py-6 relative z-10">
        {/* Header - Compact */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              Digital Defence
            </h1>
          </div>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto drop-shadow-md leading-relaxed font-medium px-2">
            Protect yourself from scams in Singapore! Analyze suspicious content and test your detection skills.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-3xl mx-auto colorful-shadow digital-pulse bg-white/20 backdrop-blur-md border-white/30">
            <TabsTrigger value="detector" className="flex items-center gap-1 text-white data-[state=active]:bg-white/30 data-[state=active]:text-white text-xs sm:text-sm">
              <Search className="h-3 w-3 sm:h-4 sm:w-4" />
              Detectors
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-1 text-white data-[state=active]:bg-white/30 data-[state=active]:text-white text-xs sm:text-sm">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              Spot the Scam
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-1 text-white data-[state=active]:bg-white/30 data-[state=active]:text-white text-xs sm:text-sm">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
              Learn & Protect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detector" className="mt-4 sm:mt-6">
            <div className="space-y-4 sm:space-y-6">
              <ScamDetector />
              <ImageScamDetector />
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-4 sm:mt-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Back to Home Button */}
              <div className="flex justify-start mb-2 sm:mb-4">
                <Button
                  onClick={() => {
                    console.log('Back button clicked - navigating to detector'); // Debug log
                    setActiveTab('detector');
                  }}
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Detectors
                </Button>
              </div>
              <InteractiveQuiz />
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-4 sm:mt-6">
            <EducationalTips />
          </TabsContent>
        </Tabs>

        <footer className="text-center mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 max-w-2xl mx-auto colorful-shadow">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <span className="text-lg sm:text-xl">🇸🇬</span>
              <span className="text-white font-semibold text-sm sm:text-base">Protecting Singapore from Scams</span>
              <span className="text-lg sm:text-xl">🛡️</span>
            </div>
            <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-3">
              Stay vigilant! When in doubt, verify through official channels.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs text-white/90">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-2 sm:p-3">
                📞 <strong>ScamShield:</strong> 1799<br/>
                <a href="https://www.ScamShield.gov.sg" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  ScamShield.gov.sg
                </a>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-2 sm:p-3">
                📱 <strong>SGSecure App</strong><br/>
                <a href="https://www.sgsecure.gov.sg/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  Emergency alerts
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}