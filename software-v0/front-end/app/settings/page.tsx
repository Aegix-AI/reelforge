"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, Youtube, Instagram, Zap, CreditCard, LogOut } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/generate">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account information and profile picture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="username" />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm" className="transition-all duration-200 hover:bg-muted">
                        Upload
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="transition-all duration-200 hover:shadow-md">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="transition-all duration-200 hover:shadow-md">Update Password</Button>
                </CardFooter>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Permanently delete your account and all of your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Once you delete your account, there is no going back. This action cannot be undone.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="transition-all duration-200 hover:shadow-md">
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Preferences</CardTitle>
                  <CardDescription>Set your default preferences for video generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-voice">Default Voice</Label>
                    <Select defaultValue="male">
                      <SelectTrigger id="default-voice">
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No voiceover</SelectItem>
                        <SelectItem value="male">Male voice</SelectItem>
                        <SelectItem value="female">Female voice</SelectItem>
                        <SelectItem value="ai">AI voice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-music">Default Music</Label>
                    <Select defaultValue="lofi">
                      <SelectTrigger id="default-music">
                        <SelectValue placeholder="Select music" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No music</SelectItem>
                        <SelectItem value="lofi">Lo-fi Chill</SelectItem>
                        <SelectItem value="epic">Epic Cinematic</SelectItem>
                        <SelectItem value="edm">Energetic EDM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="default-subtitles" defaultChecked />
                    <Label htmlFor="default-subtitles">Always include subtitles</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-variations">Default Number of Variations</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="default-variations">
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="transition-all duration-200 hover:shadow-md">Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications when your videos are ready
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="transition-all duration-200 hover:shadow-md">Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Connections Tab */}
            <TabsContent value="connections" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Connections</CardTitle>
                  <CardDescription>Connect your social media accounts for direct publishing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <Youtube className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-medium">YouTube</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button className="transition-all duration-200 hover:shadow-md">Connect</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <Instagram className="h-6 w-6 text-pink-600" />
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button className="transition-all duration-200 hover:shadow-md">Connect</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                          fill="currentColor"
                        />
                      </svg>
                      <div>
                        <p className="font-medium">TikTok</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button className="transition-all duration-200 hover:shadow-md">Connect</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Manage your API keys for programmatic access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly />
                      <Button variant="outline" className="transition-all duration-200 hover:bg-muted">
                        Copy
                      </Button>
                      <Button variant="outline" className="transition-all duration-200 hover:bg-muted">
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your API key provides full access to your account. Keep it secure.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <p className="font-medium">Free Trial</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">5 videos per month, basic features</p>
                    </div>
                    <Button className="transition-all duration-200 hover:shadow-md">Upgrade</Button>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Usage</p>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-1/5"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">1 of 5 videos used this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Add or update your payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      <p className="text-sm text-muted-foreground">No payment method added</p>
                    </div>
                    <Button className="transition-all duration-200 hover:shadow-md">Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your past invoices and billing history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center py-6">No billing history available</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button variant="outline" className="flex items-center gap-2 transition-all duration-200 hover:bg-muted">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
