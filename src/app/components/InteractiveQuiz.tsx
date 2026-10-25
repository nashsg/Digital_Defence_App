import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertTriangle, CheckCircle, Target, Award, RefreshCw, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface QuizQuestion {
  id: number;
  type: 'image' | 'scenario';
  question: string;
  description: string;
  imageUrl?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: 'phone' | 'email' | 'website' | 'general';
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'scenario',
    category: 'email',
    question: 'Spot the Suspicious Email',
    description: `Look at this email claiming to be from IRAS (tax authority). What makes it suspicious?

📧 EMAIL CONTENT:
━━━━━━━━━━━━━━━━━━━━━━━━━
From: iras-singapore@gov-sg.com
Subject: URGENT: Tax Refund Processing - Action Required
Date: Today 9:23 AM

Dear Taxpayer,

Our records show that you are eligible for a tax refund of $1,247.50 for the 2023 assessment year. However, your refund has been SUSPENDED due to incomplete information in our system.

⚠️ IMMEDIATE ACTION REQUIRED ⚠️

To process your refund, please verify your details by clicking the link below and entering your:
• Full NRIC number
• SingPass password
• Bank account details

CLICK HERE TO CLAIM: https://iras-refund.gov-sg.com/verify-now

You have 24 hours to complete this verification or your refund will be permanently forfeited.

Best regards,
IRAS Refund Department
━━━━━━━━━━━━━━━━━━━━━━━━━`,
    options: [
      {
        id: 'a',
        text: 'The sender domain is "gov-sg.com" instead of ".gov.sg"',
        isCorrect: true,
        explanation: 'Correct! Official IRAS emails come from "@iras.gov.sg". The fake domain "gov-sg.com" is a common scammer tactic to impersonate Singapore government agencies.'
      },
      {
        id: 'b',
        text: 'The email looks legitimate and should be trusted',
        isCorrect: false,
        explanation: 'Wrong! This email has multiple red flags: fake domain, urgent threats, and requests for sensitive information like SingPass passwords.'
      },
      {
        id: 'c', 
        text: 'Only the urgent deadline seems suspicious',
        isCorrect: false,
        explanation: 'There are actually multiple red flags here: fake sender domain, requests for SingPass password (which IRAS never asks for), and suspicious URL.'
      },
      {
        id: 'd',
        text: 'The URL looks correct since it has "iras" in it',
        isCorrect: false,
        explanation: 'Wrong! Real IRAS links use "iras.gov.sg" - scammers often use similar-looking domains with extra words to trick people.'
      }
    ]
  },
  {
    id: 2,
    type: 'scenario',
    category: 'phone',
    question: 'WhatsApp Love Scam Message',
    description: `You've been chatting with "David" on a dating app for 3 weeks. He claims to be a British engineer working in Singapore. You've never met in person but have been exchanging messages daily. Today you received this WhatsApp conversation:

💬 WHATSAPP CHAT:
━━━━━━━━━━━━━━━━━━━━━━━━━

David: Hi darling! Hope you're having a good day 😘

You: Hi! Yes, work was busy today. How about you?

David: I'm actually in a bit of trouble... My business partner in Hong Kong has frozen our company accounts due to a misunderstanding. I have an urgent payment of $8,000 due tomorrow for a major client project.

David: I know we haven't met in person yet, but you're the only person I trust here in Singapore. Could you help me with a temporary loan? I'll pay you back $10,000 next week when this gets resolved. 

David: I can even transfer you the money through my crypto wallet as collateral. Please baby, I really need your help 💔

You: [What's your response?]
━━━━━━━━━━━━━━━━━━━━━━━━━`,
    options: [
      {
        id: 'a',
        text: 'Agree to help since he\'s offering to pay back more money',
        isCorrect: false,
        explanation: 'HUGE RED FLAG! This is a classic love scam tactic. Never send money to someone you haven\'t met in person, regardless of promises of higher returns.'
      },
      {
        id: 'b',
        text: 'Block him immediately - this is definitely a scam',
        isCorrect: true,
        explanation: 'Correct! Asking for money before meeting in person is the #1 sign of a love scam in Singapore. Block and report to authorities immediately.'
      },
      {
        id: 'c',
        text: 'Ask him to meet in person first to discuss this',
        isCorrect: false,
        explanation: 'Don\'t negotiate! Love scammers will make excuses why they can\'t meet. The moment they ask for money, it\'s over - block them immediately.'
      },
      {
        id: 'd',
        text: 'Ask for his business registration details to verify his story',
        isCorrect: false,
        explanation: 'Scammers can fake documents easily. Once someone you haven\'t met asks for money, there\'s no need to verify anything - it\'s 100% a scam.'
      }
    ]
  },
  {
    id: 3,
    type: 'scenario',
    category: 'website',
    question: 'Fake Banking Website Analysis',
    description: `You received an SMS about "suspicious activity" and clicked the link. It brought you to this login page:

🌐 WEBSITE ANALYSIS:
━━━━━━━━━━━━━━━━━━━━━━━━━
URL: http://dbs-security-sg.com/login
Page Title: DBS Bank Security Verification

URGENT SECURITY ALERT
Your account has been temporarily suspended due to multiple failed login attempts from an unknown device.

To reactivate your account, please verify your identity:

Required Information:
• Full NRIC Number: [______]
• Mobile Number: [______] 
• Debit Card PIN: [______]
• ATM PIN: [______]
• Internet Banking Password: [______]

VERIFY NOW [Button]

Note: This verification must be completed within 2 hours or your account will be permanently locked.
━━━━━━━━━━━━━━━━━━━━━━━━━`,
    options: [
      {
        id: 'a',
        text: 'The website URL is wrong - it should be "dbs.com.sg"',
        isCorrect: true,
        explanation: 'Exactly right! The official DBS website is "dbs.com.sg". Scammers use similar domains with extra words like "security" to trick users.'
      },
      {
        id: 'b',
        text: 'The site is missing HTTPS security (no padlock icon)',
        isCorrect: true,
        explanation: 'Critical red flag! Real DBS banking sites ALWAYS use "https://" with a padlock. Never enter banking details on unsecured "http://" sites.'
      },
      {
        id: 'c',
        text: 'Banks never ask for ALL this information at once',
        isCorrect: true,
        explanation: 'Spot on! Legitimate banks never ask for your full NRIC, mobile number, debit PIN, and ATM PIN all at once. This is a massive red flag.'
      },
      {
        id: 'd',
        text: 'All of the above - this is clearly a phishing site',
        isCorrect: true,
        explanation: 'Perfect analysis! This fake site has multiple red flags: wrong URL, no HTTPS security, and excessive information requests. Never enter details here!'
      }
    ]
  },
  {
    id: 4,
    type: 'scenario',
    category: 'email',
    question: 'Investment Scam Email',
    description: `You received this investment opportunity email:

📧 INVESTMENT EMAIL:
━━━━━━━━━━━━━━━━━━━━━━━━━
From: singapore-wealth@mas-approved.com
Subject: 🚀 MAS-Approved Investment - 300% Returns in 30 Days!

Dear Singapore Resident,

Congratulations! You've been selected for an EXCLUSIVE investment opportunity officially endorsed by the Monetary Authority of Singapore (MAS).

💰 GUARANTEED RETURNS:
• Minimum Investment: $1,000
• Maximum Returns: 300% in just 30 days
• Zero Risk - Government Backed
• Limited Time: Only 48 hours left!

✅ Why This Works:
This proprietary AI trading algorithm has been secretly used by Singapore banks for the past 2 years. Now, MAS is allowing LIMITED public access.

⭐ Testimonials:
"I invested $5,000 and got back $18,000!" - Sarah L., Jurong
"Best decision ever - paid off my HDB loan!" - Ahmad R., Tampines

🔥 TO SECURE YOUR SPOT:
Transfer your investment amount to:
DBS Account: 123-456789-0 (Name: Investment Holdings Pte Ltd)

For crypto investors: Bitcoin wallet provided upon request.

Don't miss out - only 50 spots remaining!
━━━━━━━━━━━━━━━━━━━━━━━━━`,
    options: [
      {
        id: 'a',
        text: 'The 300% return in 30 days is unrealistic',
        isCorrect: true,
        explanation: 'Correct! No legitimate investment offers 300% returns in 30 days. This is mathematically impossible and a classic scam promise.'
      },
      {
        id: 'b',
        text: 'MAS never endorses private investment schemes',
        isCorrect: true,
        explanation: 'Exactly! MAS is Singapore\'s financial regulator and NEVER endorses private investment schemes. This claim is completely false.'
      },
      {
        id: 'c',
        text: 'Legitimate investments don\'t use personal bank accounts',
        isCorrect: true,
        explanation: 'Right! Licensed investment firms use proper channels, not personal bank accounts. This transfer method is a major red flag.'
      },
      {
        id: 'd',
        text: 'All of the above - this is a clear investment scam',
        isCorrect: true,
        explanation: 'Perfect! This email has all the hallmarks of an investment scam: unrealistic returns, false authority endorsements, urgency tactics, and suspicious payment methods.'
      }
    ]
  },
  {
    id: 5,
    type: 'scenario',
    category: 'phone',
    question: 'Fake Government SMS Scam',
    description: `You received this SMS on your phone:

📱 SMS MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━
From: +65 8234 5678
Received: Today 2:47 PM

🇸🇬 SINGAPORE GOVERNMENT ALERT 🇸🇬

Your SingPass account has been COMPROMISED. Immediate action required to prevent account suspension.

SECURITY BREACH DETECTED:
• Unauthorized login from China
• Suspicious transactions flagged
• Personal data at risk

URGENT: Update your security settings now
👉 http://bit.ly/singpass-security-sg

You have 6 hours to verify your account or it will be permanently deactivated.

For assistance: Call 1800-SingPass

This is an automated message from GovTech Singapore.
━━━━━━━━━━━━━━━━━━━━━━━━━`,
    options: [
      {
        id: 'a',
        text: 'The sender number looks suspicious - not official',
        isCorrect: true,
        explanation: 'Correct! Real Singapore government SMS come from shortcodes like "70000" or official numbers, never from regular mobile numbers like +65 8xxx xxxx.'
      },
      {
        id: 'b',
        text: 'Official government links are never shortened URLs',
        isCorrect: true,
        explanation: 'Exactly! Official Singapore government communications always use official .gov.sg links, never shortened URLs that hide the real destination.'
      },
      {
        id: 'c',
        text: 'SingPass issues are handled through official channels, not SMS',
        isCorrect: true,
        explanation: 'Right! SingPass security issues are communicated through the official app or website (singpass.gov.sg), never through SMS with urgent deadlines.'
      },
      {
        id: 'd',
        text: 'All of the above make this SMS highly suspicious',
        isCorrect: true,
        explanation: 'Perfect analysis! This SMS has all the red flags: unofficial sender number, bit.ly links, urgent threats, and requests for sensitive information. Delete immediately!'
      }
    ]
  },
  {
    id: 6,
    type: 'scenario',
    category: 'phone',
    question: 'Fake Police/Court Call Scam',
    description: `You receive this phone call:

📞 PHONE CALL TRANSCRIPT:
━━━━━━━━━━━━━━━━━━━━━━━━━
Caller ID: +65 6355 0000 (Looks like police number)

Caller: "Hello, this is Inspector Tan from Singapore Police Force, Central Division. Am I speaking to [Your Name]?"

You: "Yes, that's me."

Caller: "Sir/Madam, I'm calling regarding a serious matter. Your identity card has been used in a money laundering case involving $2.8 million. We have evidence that criminals have been using your personal details."

Caller: "For your protection, we need to freeze your bank accounts immediately. You also need to transfer your savings to a secure government account while we investigate this matter."

Caller: "This is very urgent. If you don't comply within 2 hours, we will issue an arrest warrant. Can you go to an ATM now and start the transfer process?"

Caller: "Please don't discuss this with anyone - it could compromise our investigation."

How do you respond?
━━━━━━━━━━━━━━━━━━━━━━━━━`,
    options: [
      {
        id: 'a',
        text: 'Ask for his police ID number to verify his identity',
        isCorrect: false,
        explanation: 'Don\'t engage at all! Scammers can provide fake ID numbers. The proper response is to hang up immediately and report to authorities.'
      },
      {
        id: 'b',
        text: 'Hang up immediately - this is definitely a scam call',
        isCorrect: true,
        explanation: 'Absolutely right! This is a classic impersonation scam. Singapore Police NEVER handle legal matters over the phone or ask for money transfers.'
      },
      {
        id: 'c',
        text: 'Ask to meet at the police station to discuss this matter',
        isCorrect: false,
        explanation: 'Still engaging with the scammer! Real police investigations don\'t start with unsolicited phone calls asking for money transfers.'
      },
      {
        id: 'd',
        text: 'Request written documentation before taking any action',
        isCorrect: false,
        explanation: 'Don\'t negotiate with scammers! Police impersonation scams are serious crimes - hang up and report to authorities immediately.'
      }
    ]
  }
];

export function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleAnswerSelect = (answerId: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answerId);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    
    const question = quizQuestions[currentQuestion];
    const selectedOption = question.options.find(option => option.id === selectedAnswer);
    
    if (selectedOption?.isCorrect) {
      setScore(score + 1);
    }
    
    setUserAnswers([...userAnswers, selectedAnswer]);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const getScoreLevel = (score: number, total: number): 'beginner' | 'intermediate' | 'expert' => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'expert';
    if (percentage >= 60) return 'intermediate';
    return 'beginner';
  };

  const getScoreMessage = (level: 'beginner' | 'intermediate' | 'expert') => {
    switch (level) {
      case 'expert':
        return 'Scam Detection Expert! You\'re well-prepared to spot Singapore scams!';
      case 'intermediate':
        return 'Good Job! You caught most scams, but review the ones you missed.';
      case 'beginner':
        return 'Keep Learning! Review the educational materials to improve your scam detection skills.';
    }
  };

  const progress = ((currentQuestion + (quizCompleted ? 1 : 0)) / quizQuestions.length) * 100;

  if (quizCompleted) {
    const level = getScoreLevel(score, quizQuestions.length);
    
    return (
      <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 space-y-3 sm:space-y-4 relative">{/* Removed min-h-screen to prevent scroll issues */}
        
        <Card className="colorful-shadow bg-white/98 backdrop-blur-md border-white/40 relative">
          <CardHeader className="text-center px-3 sm:px-6 py-3 sm:py-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center">
                <Award className={`h-6 w-6 sm:h-8 sm:w-8 ${
                  level === 'expert' ? 'text-yellow-500' : 
                  level === 'intermediate' ? 'text-blue-500' : 'text-gray-500'
                }`} />
              </div>
              <CardTitle className="text-gray-800 text-lg sm:text-xl font-bold">
                Quiz Complete!
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                See how well you can spot Singapore scams!
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-6 px-3 sm:px-6">
            <div className="text-center space-y-2 sm:space-y-4">
              <div className="text-3xl sm:text-4xl md:text-6xl">
                {level === 'expert' ? '🏆' : level === 'intermediate' ? '🥉' : '📚'}
              </div>
              
              <div className="space-y-2">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  {score}/{quizQuestions.length}
                </div>
                <Badge 
                  variant={level === 'expert' ? 'default' : level === 'intermediate' ? 'secondary' : 'outline'}
                  className={`${
                    level === 'expert' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    level === 'intermediate' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                    'bg-gradient-to-r from-gray-400 to-gray-600'
                  } text-white text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2`}
                >
                  {level === 'expert' ? 'EXPERT' : 
                   level === 'intermediate' ? 'INTERMEDIATE' : 'BEGINNER'}
                </Badge>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 px-1 sm:px-2">
                {getScoreMessage(level)}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-6 rounded-lg border border-blue-200">
              <h4 className="text-blue-800 mb-2 sm:mb-4 text-sm sm:text-base font-semibold">Your Performance:</h4>
              <div className="space-y-1 sm:space-y-3 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-blue-700">Correct Answers:</span>
                  <span className="font-semibold text-blue-800">{score}/{quizQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Accuracy:</span>
                  <span className="font-semibold text-blue-800">{Math.round((score / quizQuestions.length) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Scam Detection Level:</span>
                  <span className="font-semibold text-blue-800 capitalize">{level}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <Button 
                onClick={restartQuiz}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-sm sm:text-base py-2 sm:py-3"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button 
                variant="outline"
                className="border-purple-200 hover:bg-purple-50 text-purple-700 text-sm sm:text-base py-2 sm:py-3"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 space-y-3 sm:space-y-4 relative">
      


      <Card className="colorful-shadow bg-white/98 backdrop-blur-md border-white/40 relative">
        {/* CLEAN MOBILE HEADER */}
        <CardHeader className="px-3 sm:px-6 py-3 sm:py-4">
          {/* Question Number Row */}
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
            <CardTitle className="text-gray-900 font-bold text-sm sm:text-base md:text-lg">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </CardTitle>
          </div>
          
          {/* Score and Category Row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <CardDescription className="text-gray-700 font-medium text-xs sm:text-sm md:text-base order-2 sm:order-1">
              Category: {question.category === 'phone' ? 'Phone Call' : 
                        question.category === 'email' ? 'Email' :
                        question.category === 'website' ? 'Website' : 'General'}
            </CardDescription>
            <Badge variant="outline" className="border-blue-300 text-blue-800 bg-blue-50 font-semibold text-xs sm:text-sm self-start sm:self-center order-1 sm:order-2">
              Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
          <Progress value={progress} className="w-full" />
          
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">{question.question}</h3>
            <div className="text-gray-800 text-xs sm:text-sm md:text-base font-medium leading-relaxed whitespace-pre-line bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg border-l-4 border-red-500 overflow-x-auto">
              {question.description}
            </div>
            
            {question.type === 'image' && question.imageUrl && (
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <ImageWithFallback 
                  src={question.imageUrl} 
                  alt="Quiz scenario" 
                  className="w-full h-40 sm:h-48 md:h-64 object-cover"
                />
              </div>
            )}
            
            <div className="space-y-2 sm:space-y-3">
              {question.options.map((option) => (
                <div key={option.id}>
                  <Button
                    variant={selectedAnswer === option.id ? "default" : "outline"}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showExplanation}
                    className={`w-full text-left justify-start p-2 sm:p-3 md:p-4 h-auto min-h-[40px] sm:min-h-[50px] md:min-h-[60px] text-xs sm:text-sm md:text-base font-medium transition-all ${
                      selectedAnswer === option.id 
                        ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white border-transparent shadow-lg' 
                        : 'border-2 border-gray-300 hover:bg-gray-100 text-gray-900 bg-white'
                    } ${
                      showExplanation && option.isCorrect 
                        ? 'border-green-600 bg-green-100 text-green-900' 
                        : showExplanation && selectedAnswer === option.id && !option.isCorrect
                        ? 'border-red-600 bg-red-100 text-red-900'
                        : ''
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5 sm:mt-0 ${
                        selectedAnswer === option.id && !showExplanation 
                          ? 'border-white text-white' 
                          : showExplanation && option.isCorrect
                          ? 'border-green-600 text-green-600 bg-green-50'
                          : showExplanation && selectedAnswer === option.id && !option.isCorrect
                          ? 'border-red-600 text-red-600 bg-red-50'
                          : 'border-gray-600 text-gray-600'
                      }`}>
                        {option.id.toUpperCase()}
                      </div>
                      <span className="flex-1 text-left leading-relaxed">{option.text}</span>
                      {showExplanation && option.isCorrect && (
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                      )}
                      {showExplanation && selectedAnswer === option.id && !option.isCorrect && (
                        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </Button>
                  {showExplanation && selectedAnswer === option.id && (
                    <div className={`mt-2 sm:mt-3 p-2 sm:p-3 md:p-4 rounded-lg border-2 font-medium text-xs sm:text-sm md:text-base ${
                      option.isCorrect 
                        ? 'bg-green-50 border-green-300 text-green-900' 
                        : 'bg-red-50 border-red-300 text-red-900'
                    }`}>
                      {option.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 md:pt-6">
              {!showExplanation ? (
                <Button 
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                  className="flex-1 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg shadow-lg disabled:opacity-50"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={nextQuestion}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg shadow-lg"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}