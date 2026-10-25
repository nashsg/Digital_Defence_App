import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Camera, Upload, Shield, AlertTriangle, CheckCircle, Info, X, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageAnalysisResult {
  riskLevel: 'low' | 'medium' | 'high';
  type: 'whatsapp' | 'email' | 'website' | 'flyer' | 'unknown';
  indicators: string[];
  recommendations: string[];
  score: number;
  confidence: number;
}

export function ImageScamDetector() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<ImageAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('❌ Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = performImageAnalysis();
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const performImageAnalysis = (): ImageAnalysisResult => {
    // Mock analysis based on random patterns - in a real app this would use AI/ML
    const scenarios = [
      {
        type: 'whatsapp' as const,
        riskLevel: 'high' as const,
        score: 85,
        confidence: 92,
        indicators: [
          'Detected WhatsApp message asking for personal information',
          'Contains urgent language and threats',
          'Requests for NRIC or banking details identified',
          'Suspicious phone number format detected',
          'Grammar and spelling errors typical of scams'
        ],
        recommendations: [
          'Do not respond to this message',
          'Block the sender immediately',
          'Report to ScamShield at 1799',
          'Never share NRIC or banking details via WhatsApp',
          'Verify any claims through official channels'
        ]
      },
      {
        type: 'email' as const,
        riskLevel: 'high' as const,
        score: 78,
        confidence: 88,
        indicators: [
          'Phishing email impersonating Singapore government',
          'Fake sender domain not ending in .gov.sg',
          'Urgency tactics: "Account will be suspended"',
          'Suspicious links leading to non-official websites',
          'Poor grammar inconsistent with official communications'
        ],
        recommendations: [
          'Delete this email immediately',
          'Do not click any links in the email',
          'Report to SPF Anti-Scam Centre',
          'Check official .gov.sg websites directly',
          'Enable email security filters'
        ]
      },
      {
        type: 'website' as const,
        riskLevel: 'medium' as const,
        score: 65,
        confidence: 75,
        indicators: [
          'Website design mimics legitimate Singapore bank',
          'URL contains suspicious characters or typos',
          'Missing official security certificates',
          'Login form requesting excessive information',
          'No official contact information displayed'
        ],
        recommendations: [
          'Do not enter any login credentials',
          'Close this website immediately',
          'Navigate to official bank website directly',
          'Check URL carefully for typos',
          'Report suspicious website to your bank'
        ]
      },
      {
        type: 'flyer' as const,
        riskLevel: 'low' as const,
        score: 25,
        confidence: 65,
        indicators: [
          'Appears to be legitimate promotional material',
          'Contains proper contact information',
          'Professional design and layout',
          'No urgent call-to-action for personal information'
        ],
        recommendations: [
          'Low risk detected but still verify offers',
          'Contact business directly through official channels',
          'Check reviews online before engaging',
          'Be cautious of too-good-to-be-true offers'
        ]
      }
    ];

    // Randomly select a scenario for demo purposes
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  const clearImage = () => {
    setCapturedImage(null);
    setResult(null);
    stopCamera();
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
      {!capturedImage && !isCameraActive && (
        <Card className="colorful-shadow digital-pulse bg-white/95 backdrop-blur-md border-white/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
              <div className="flex gap-1">
                <Camera className="h-4 w-4 text-purple-600" />
                <Upload className="h-4 w-4 text-pink-600" />
              </div>
              Image & Screenshot Detector
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Take photos or upload screenshots of suspicious content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button 
                onClick={startCamera} 
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Take Photo
              </Button>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-purple-200 hover:bg-purple-50 text-purple-700 flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </CardContent>
        </Card>
      )}

      {isCameraActive && (
        <Card className="colorful-shadow bg-white/95 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-800">
              <span className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-purple-600" />
                📷 Camera Active
              </span>
              <Button 
                onClick={stopCamera}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <Button 
              onClick={capturePhoto}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            >
              📸 Capture Photo
            </Button>
            <canvas ref={canvasRef} className="hidden" />
          </CardContent>
        </Card>
      )}

      {capturedImage && (
        <Card className="colorful-shadow bg-white/95 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-800">
              <span className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                🖼️ Captured Image
              </span>
              <Button 
                onClick={clearImage}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={capturedImage} 
                alt="Captured content" 
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <Button 
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                  🔄 Analyzing Image...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  ✨ Analyze for Scams
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="colorful-shadow bg-white/95 backdrop-blur-md border-white/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
              {getRiskIcon(result.riskLevel)}
              Image Analysis Results
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
              Risk Score: {result.score}/100 • Confidence: {result.confidence}% • 
              Type: {result.type === 'whatsapp' ? 'WhatsApp' : 
                      result.type === 'email' ? 'Email' :
                      result.type === 'website' ? 'Website' :
                      result.type === 'flyer' ? 'Flyer' : 'Unknown'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border border-red-200">
                <h4 className="mb-2 text-red-800 font-semibold text-sm">Detection Results:</h4>
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