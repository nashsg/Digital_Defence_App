import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, Phone, Link, AlertTriangle, Eye } from 'lucide-react';

export function EducationalTips() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="flex items-center justify-center gap-2 mb-2">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🛡️ Scam Prevention Guide 📚
          </span>
        </h2>
        <p className="text-white/80">
          🚀 Learn how to identify and protect yourself from common scams in Singapore! Stay one step ahead of scammers! 🇸🇬✨
        </p>
      </div>

      <Tabs defaultValue="phone" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-md border-white/30">
          <TabsTrigger value="phone" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30 data-[state=active]:text-white">
            <Phone className="h-4 w-4" />
            📞 Phone
          </TabsTrigger>
          <TabsTrigger value="web" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30 data-[state=active]:text-white">
            <Link className="h-4 w-4" />
            🌐 Web
          </TabsTrigger>
          <TabsTrigger value="protection" className="flex items-center gap-2 text-white data-[state=active]:bg-white/30 data-[state=active]:text-white">
            <Shield className="h-4 w-4" />
            🛡️ Protect
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phone" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="colorful-shadow bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  🚨 Common Phone Scams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="text-red-800">🏛️ Government Impersonation</h4>
                  <p className="text-sm text-red-700">
                    Scammers pretending to be from IRAS, MOH, SPF, or other agencies demanding immediate payment.
                  </p>
                </div>
                <div>
                  <h4 className="text-red-800">🏦 Bank/DBS/OCBC/UOB Scams</h4>
                  <p className="text-sm text-red-700">
                    Fake calls claiming suspicious account activity or asking for banking details.
                  </p>
                </div>
                <div>
                  <h4 className="text-red-800">🦠 COVID-19 Related Scams</h4>
                  <p className="text-sm text-red-700">
                    Fake vaccination appointments, TraceTogether issues, or health ministry calls.
                  </p>
                </div>
                <div>
                  <h4 className="text-red-800">📦 Delivery/SingPost Scams</h4>
                  <p className="text-sm text-red-700">
                    Fake delivery notifications asking for payment or personal details.
                  </p>
                </div>
                <div>
                  <h4 className="text-red-800">💼 Job Scams</h4>
                  <p className="text-sm text-red-700">
                    Too-good-to-be-true job offers requiring upfront payment or personal details.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="colorful-shadow bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Eye className="h-5 w-5 text-orange-600" />
                  👀 Red Flags to Watch For
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4>Urgent Action Required</h4>
                  <p className="text-sm text-muted-foreground">
                    Claims your account will be closed or legal action taken immediately.
                  </p>
                </div>
                <div>
                  <h4>Requests for NRIC/Banking Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Asking for NRIC, SingPass login, bank account details, or credit card numbers.
                  </p>
                </div>
                <div>
                  <h4>iTunes/Google Play Gift Cards</h4>
                  <p className="text-sm text-muted-foreground">
                    Government agencies never ask for payments via gift cards or cryptocurrency.
                  </p>
                </div>
                <div>
                  <h4>Local Number Display</h4>
                  <p className="text-sm text-muted-foreground">
                    Numbers appearing as local Singapore numbers but from overseas scammers.
                  </p>
                </div>
                <div>
                  <h4>Poor English/Mandarin</h4>
                  <p className="text-sm text-muted-foreground">
                    Official agencies in Singapore maintain professional communication standards.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="web" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="colorful-shadow bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                  🌐 Common Web Scams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4>Fake SingPass/Government Emails</h4>
                  <p className="text-sm text-muted-foreground">
                    Phishing emails pretending to be from SingPass, IRAS, or other government agencies.
                  </p>
                </div>
                <div>
                  <h4>Fake Shopping Sites</h4>
                  <p className="text-sm text-muted-foreground">
                    Fraudulent e-commerce sites, especially during sales periods like 11.11 or 12.12.
                  </p>
                </div>
                <div>
                  <h4>Love/Romance Scams</h4>
                  <p className="text-sm text-muted-foreground">
                    Online relationships leading to requests for money, very common in Singapore.
                  </p>
                </div>
                <div>
                  <h4>Investment/Forex Scams</h4>
                  <p className="text-sm text-muted-foreground">
                    Fake investment platforms promising guaranteed returns on forex or cryptocurrency.
                  </p>
                </div>
                <div>
                  <h4>Fake Bank Websites</h4>
                  <p className="text-sm text-muted-foreground">
                    Copycat sites of DBS, OCBC, UOB, or POSB designed to steal login credentials.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="colorful-shadow bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Eye className="h-5 w-5 text-blue-600" />
                  🔗 URL Red Flags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4>Fake .gov.sg Domains</h4>
                  <p className="text-sm text-muted-foreground">
                    "gov-sg.com" or "singpass-gov.com" instead of official ".gov.sg" domains.
                  </p>
                </div>
                <div>
                  <h4>Suspicious TLDs</h4>
                  <p className="text-sm text-muted-foreground">
                    Domains ending in .tk, .ml, .ga, .cf instead of legitimate .com or .sg.
                  </p>
                </div>
                <div>
                  <h4>URL Shorteners</h4>
                  <p className="text-sm text-muted-foreground">
                    bit.ly, tinyurl.com links hiding the real destination, common in SMS scams.
                  </p>
                </div>
                <div>
                  <h4>Bank Domain Typos</h4>
                  <p className="text-sm text-muted-foreground">
                    "dbs-bank.com" instead of "dbs.com.sg" or similar variations.
                  </p>
                </div>
                <div>
                  <h4>No HTTPS/Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Missing padlock icon, especially for banking or government sites.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="protection" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="colorful-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Shield className="h-5 w-5 text-green-600" />
                  🛡️ Protection Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4>Verify Through Official Channels</h4>
                  <p className="text-sm text-muted-foreground">
                    Call government agencies directly using numbers from official .gov.sg websites.
                  </p>
                </div>
                <div>
                  <h4>Never Share NRIC/SingPass</h4>
                  <p className="text-sm text-muted-foreground">
                    Government agencies already have your details and won't ask for them over phone.
                  </p>
                </div>
                <div>
                  <h4>Use ScamShield App</h4>
                  <p className="text-sm text-muted-foreground">
                    Download the free ScamShield app to block known scam numbers and messages.
                  </p>
                </div>
                <div>
                  <h4>Check Official Websites</h4>
                  <p className="text-sm text-muted-foreground">
                    Only use official .gov.sg domains and verified bank websites ending in .com.sg.
                  </p>
                </div>
                <div>
                  <h4>Enable 2FA</h4>
                  <p className="text-sm text-muted-foreground">
                    Use two-factor authentication for SingPass and all your banking apps.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="colorful-shadow bg-gradient-to-br from-rose-50 to-red-50 border-rose-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Shield className="h-5 w-5 text-rose-600" />
                  🆘 What to Do If Scammed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4>Contact Your Bank Immediately</h4>
                  <p className="text-sm text-muted-foreground">
                    Call DBS/POSB, OCBC, UOB, or other banks to freeze accounts and report fraud.
                  </p>
                </div>
                <div>
                  <h4>Report to Police</h4>
                  <p className="text-sm text-muted-foreground">
                    File a report at scam.gov.sg or call 1800-255-0000 (SPF hotline).
                  </p>
                </div>
                <div>
                  <h4>Change All Passwords</h4>
                  <p className="text-sm text-muted-foreground">
                    Update SingPass, banking, and email passwords immediately.
                  </p>
                </div>
                <div>
                  <h4>Check Credit Bureau Singapore</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor your credit report through Credit Bureau Singapore for suspicious activity.
                  </p>
                </div>
                <div>
                  <h4>Inform Your Network</h4>
                  <p className="text-sm text-muted-foreground">
                    Warn family and friends if scammers may have accessed your contacts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 colorful-shadow bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800">🇸🇬 Singapore Resources</CardTitle>
              <CardDescription className="text-indigo-600">Official agencies and websites for reporting scams in Singapore</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border border-red-200">
                  <h4 className="text-red-800 font-semibold">🚔 Singapore Police Force</h4>
                  <p className="text-sm text-red-700">scam.gov.sg | 1800-255-0000</p>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-blue-800 font-semibold">📱 ScamShield App</h4>
                  <p className="text-sm text-blue-700">Free app by NCPC & SPF - blocks scam calls/SMS</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Helpline: 1799 (24/7)<br/>
                    <a href="https://www.ScamShield.gov.sg" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                      www.ScamShield.gov.sg
                    </a>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-lg border border-purple-200">
                  <h4 className="text-purple-800 font-semibold">🚨 SGSecure App</h4>
                  <p className="text-sm text-purple-700">Emergency preparedness & community vigilance</p>
                  <p className="text-xs text-purple-600 mt-1">
                    <a href="https://www.sgsecure.gov.sg/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-800">
                      Download for emergency alerts & safety tips
                    </a>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200">
                  <h4 className="text-green-800 font-semibold">🏦 Monetary Authority of Singapore</h4>
                  <p className="text-sm text-green-700">mas.gov.sg (report fake investment sites)</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border border-yellow-200">
                  <h4 className="text-orange-800 font-semibold">🆔 SingPass Support</h4>
                  <p className="text-sm text-orange-700">singpass.gov.sg | 6643-0555</p>
                </div>
                <div className="bg-gradient-to-r from-teal-100 to-blue-100 p-4 rounded-lg border border-teal-200">
                  <h4 className="text-teal-800 font-semibold">🛡️ CASE (Consumer Protection)</h4>
                  <p className="text-sm text-teal-700">case.org.sg | 6100-0315</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg border border-orange-200">
                <h4 className="text-orange-800 font-semibold mb-2">🆘 Emergency Scam Helplines:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="text-orange-700">
                    <strong>📞 ScamShield Helpline:</strong> 1799 (24/7)
                  </div>
                  <div className="text-orange-700">
                    <strong>🚨 Anti-Scam Centre:</strong> 1800-255-0000
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}