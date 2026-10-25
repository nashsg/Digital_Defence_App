import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Shield, AlertTriangle, CheckCircle, Phone, Link, Info } from 'lucide-react';

interface AnalysisResult {
  riskLevel: 'low' | 'medium' | 'high';
  type: 'phone' | 'url' | 'unknown';
  indicators: string[];
  recommendations: string[];
  score: number;
}

export function ScamDetector() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeInput = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = performAnalysis(input.trim());
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const performAnalysis = (text: string): AnalysisResult => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    // Clean input for analysis
    const cleanInput = text.replace(/[\s\-\(\)]/g, '');
    
    // Check if it's a Singapore phone number
    if (isSingaporePhoneNumber(cleanInput)) {
      return analyzePhoneNumber(cleanInput);
    } else if (urlRegex.test(text) || text.includes('.')) {
      return analyzeURL(text);
    } else {
      return {
        riskLevel: 'medium',
        type: 'unknown',
        indicators: ['Unrecognized format - please enter a valid Singapore phone number or URL'],
        recommendations: ['Enter a Singapore phone number (8 digits, starting with 6, 8, or 9) or a website URL'],
        score: 50
      };
    }
  };

  const isSingaporePhoneNumber = (input: string): boolean => {
    // Remove +65 country code if present
    const cleaned = input.replace(/^\+?65/, '');
    
    // Singapore mobile numbers: 8 digits starting with 8 or 9
    // Singapore landline numbers: 8 digits starting with 6
    // Emergency/service numbers: shorter codes
    return /^[689]\d{7}$/.test(cleaned) || /^\d{3,4}$/.test(cleaned);
  };

  const analyzePhoneNumber = (phone: string): AnalysisResult => {
    const indicators: string[] = [];
    let score = 0;

    // Remove +65 country code if present
    const normalizedPhone = phone.replace(/^\+?65/, '');
    
    // Check for known Singapore scam number patterns
    const firstDigit = normalizedPhone.charAt(0);
    
    // Check for suspicious patterns in Singapore context
    if (normalizedPhone.length === 8) {
      // Check for fake government/bank numbers (impersonation)
      if (normalizedPhone.startsWith('6') && !isValidSingaporeLandline(normalizedPhone)) {
        indicators.push('Suspicious landline pattern - may be impersonating official numbers');
        score += 35;
      }
      
      // Check for overseas scam numbers spoofing local format
      if (normalizedPhone.startsWith('65')) {
        indicators.push('Suspicious format - may be overseas scammer spoofing Singapore number');
        score += 40;
      }
    }

    // Check for sequential or repetitive patterns
    if (/(\d)\1{4,}/.test(normalizedPhone)) {
      indicators.push('Contains repetitive digit patterns (common in spam calls)');
      score += 30;
    }

    if (/12345|23456|34567|45678|56789|98765|87654|76543|65432|54321/.test(normalizedPhone)) {
      indicators.push('Contains sequential number patterns (highly suspicious)');
      score += 35;
    }

    // Check for premium rate numbers (1900 series in Singapore)
    if (normalizedPhone.startsWith('1900')) {
      indicators.push('Premium rate number (1900) - may result in high charges');
      score += 45;
    }

    // Check for short codes that might be suspicious
    if (normalizedPhone.length < 4) {
      indicators.push('Very short number - verify if legitimate service code');
      score += 25;
    } else if (normalizedPhone.length >= 4 && normalizedPhone.length < 8 && !isValidSingaporeShortCode(normalizedPhone)) {
      indicators.push('Unusual number length for Singapore - potentially suspicious');
      score += 30;
    }

    // Check for numbers starting with 0 (not typical for Singapore)
    if (normalizedPhone.startsWith('0')) {
      indicators.push('Number starts with 0 - not typical Singapore format');
      score += 25;
    }

    // Check for known scam number patterns reported in Singapore
    if (/^[89]000|^[89]111|^[89]999/.test(normalizedPhone)) {
      indicators.push('Pattern commonly associated with scam calls in Singapore');
      score += 40;
    }

    const riskLevel: 'low' | 'medium' | 'high' = score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low';
    
    const recommendations = [];
    if (score >= 50) {
      recommendations.push('High risk - avoid answering or block this number immediately');
      recommendations.push('Report to Singapore Police Force at scam.gov.sg');
      recommendations.push('Check with official agencies if claiming to be government/bank');
    } else if (score >= 25) {
      recommendations.push('Exercise caution - let unknown calls go to voicemail');
      recommendations.push('Verify caller identity through official channels before sharing info');
      recommendations.push('Be wary if asking for personal details or money');
    } else {
      recommendations.push('Low risk detected, but always verify unknown callers');
      recommendations.push('Never give personal info to unsolicited calls');
    }

    if (indicators.length === 0) {
      indicators.push('No obvious red flags detected in Singapore number format');
    }

    return {
      riskLevel,
      type: 'phone',
      indicators,
      recommendations,
      score
    };
  };

  const isValidSingaporeLandline = (number: string): boolean => {
    // Singapore landlines typically start with 6 followed by specific patterns
    return /^6[0-9]{7}$/.test(number);
  };

  const isValidSingaporeShortCode = (number: string): boolean => {
    // Common Singapore service codes
    const validCodes = ['995', '999', '1777', '1800', '800'];
    return validCodes.some(code => number.startsWith(code));
  };

  const analyzeURL = (url: string): AnalysisResult => {
    const indicators: string[] = [];
    let score = 0;

    // Normalize URL
    const normalizedUrl = url.toLowerCase().replace(/^https?:\/\//, '');
    
    // Check for URL shorteners
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly'];
    if (shorteners.some(shortener => normalizedUrl.includes(shortener))) {
      indicators.push('Uses URL shortener - destination is hidden');
      score += 30;
    }

    // Check for suspicious TLDs
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.click', '.download', '.loan'];
    if (suspiciousTlds.some(tld => normalizedUrl.includes(tld))) {
      indicators.push('Uses suspicious top-level domain often associated with scams');
      score += 35;
    }

    // Check for typosquatting of popular sites (including Singapore-specific ones)
    const popularSites = ['google', 'facebook', 'amazon', 'microsoft', 'apple', 'paypal', 'ebay', 'netflix', 'dbs', 'ocbc', 'uob', 'posb', 'singpass', 'gov.sg', 'moh.gov.sg', 'iras.gov.sg'];
    for (const site of popularSites) {
      if (normalizedUrl.includes(site) && !normalizedUrl.includes(`${site}.com`) && !normalizedUrl.includes(`${site}.sg`)) {
        indicators.push(`Possible typosquatting of ${site}.com or ${site}.sg`);
        score += 40;
      }
    }

    // Check for excessive subdomains
    const subdomainCount = (normalizedUrl.match(/\./g) || []).length;
    if (subdomainCount > 3) {
      indicators.push('Unusual number of subdomains (suspicious structure)');
      score += 25;
    }

    // Check for suspicious keywords (including Singapore-specific terms)
    const suspiciousKeywords = ['verify', 'confirm', 'urgent', 'suspended', 'limited', 'security', 'update', 'singpass', 'cpf', 'iras', 'gst', 'refund', 'covid', 'vaccination', 'ministry', 'government'];
    const urlText = normalizedUrl.replace(/[.-]/g, ' ');
    if (suspiciousKeywords.some(keyword => urlText.includes(keyword))) {
      indicators.push('Contains keywords commonly used in Singapore phishing attempts');
      score += 30;
    }

    // Check for IP address instead of domain
    if (/\d+\.\d+\.\d+\.\d+/.test(normalizedUrl)) {
      indicators.push('Uses IP address instead of domain name (highly suspicious)');
      score += 50;
    }

    const riskLevel: 'low' | 'medium' | 'high' = score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low';
    
    const recommendations = [];
    if (score >= 50) {
      recommendations.push('High risk - do not click or visit this link');
      recommendations.push('Report to Singapore Police Force at scam.gov.sg');
      recommendations.push('If claiming to be from Singapore government, verify at official .gov.sg sites');
    } else if (score >= 25) {
      recommendations.push('Exercise caution - verify the sender before clicking');
      recommendations.push('Check the full URL carefully for typos or suspicious elements');
      recommendations.push('For Singapore government services, only use official .gov.sg domains');
    } else {
      recommendations.push('Low risk detected, but always verify links from unknown sources');
      recommendations.push('When in doubt, visit official websites directly');
    }

    if (indicators.length === 0) {
      indicators.push('No obvious red flags detected in URL structure');
    }

    return {
      riskLevel,
      type: 'url',
      indicators,
      recommendations,
      score
    };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Info className="h-5 w-5" />;
      case 'low': return <CheckCircle className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Card className="colorful-shadow digital-pulse bg-white/95 backdrop-blur-md border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
            <div className="flex gap-1">
              <Phone className="h-4 w-4 text-blue-600" />
              <Link className="h-4 w-4 text-purple-600" />
            </div>
            Text & URL Detector
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Enter a Singapore phone number or suspicious URL to analyze
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Paste phone number or URL here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && analyzeInput()}
              className="bg-white/80 border-purple-200 focus:border-purple-400 text-gray-800"
            />
            <Button 
              onClick={analyzeInput} 
              disabled={!input.trim() || isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-6"
            >
              {isAnalyzing ? 'Analyzing...' : 'Check'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="colorful-shadow bg-white/95 backdrop-blur-md border-white/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
              {getRiskIcon(result.riskLevel)}
              Analysis Results
              <Badge 
                variant={getRiskColor(result.riskLevel)} 
                className={`${
                  result.riskLevel === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                  result.riskLevel === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  'bg-gradient-to-r from-green-500 to-teal-500'
                } text-white text-xs`}
              >
                {result.riskLevel === 'high' ? 'HIGH RISK' :
                 result.riskLevel === 'medium' ? 'MEDIUM RISK' :
                 'LOW RISK'}
              </Badge>
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Risk Score: {result.score}/100 • Type: {result.type === 'phone' ? 'Phone Number' : result.type === 'url' ? 'Website URL' : 'Unknown'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border border-red-200">
                <h4 className="mb-2 text-red-800 font-semibold text-sm">Risk Indicators:</h4>
                <ul className="space-y-1">
                  {result.indicators.map((indicator, index) => (
                    <li key={index} className="text-xs text-red-700 flex items-start gap-2">
                      <span className="text-red-500 text-xs">•</span>
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                <h4 className="mb-2 text-blue-800 font-semibold text-sm">Recommendations:</h4>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-xs text-blue-700 flex items-start gap-2">
                      <span className="text-blue-500 text-xs">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}