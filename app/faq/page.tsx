"use client"

import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HelpCircle, ArrowLeft, MessageCircle, BookOpen, Users, Trophy, Leaf } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-5 w-5" />,
    questions: [
      {
        question: "What is FarmGrow and how does it work?",
        answer: "FarmGrow is a gamified learning platform that helps farmers adopt sustainable farming practices through interactive missions, community support, and AI-powered guidance. You can complete missions like 'Mulching Challenge' or 'Bio-Pesticide Switch' to learn new techniques while earning rewards and connecting with other farmers."
      },
      {
        question: "How do I sign up for FarmGrow?",
        answer: "You can sign up by clicking the 'Sign In' button on our homepage. We support Google OAuth for quick registration. Once signed up, you'll have access to all missions, community features, and AI support."
      },
      {
        question: "Is FarmGrow free to use?",
        answer: "Yes! FarmGrow is completely free for all farmers. We believe sustainable farming knowledge should be accessible to everyone. Our platform is supported by partnerships with agricultural organizations and government initiatives."
      },
      {
        question: "What devices can I use FarmGrow on?",
        answer: "FarmGrow works on any device with a web browser - smartphones, tablets, laptops, and desktop computers. Our responsive design ensures you get the best experience whether you're in the field with your phone or at home with your computer."
      }
    ]
  },
  {
    title: "Missions & Learning",
    icon: <BookOpen className="h-5 w-5" />,
    questions: [
      {
        question: "What types of missions are available?",
        answer: "We offer various mission categories including water conservation, soil health, pest management, crop rotation, organic farming, and government scheme awareness. Each mission provides step-by-step guidance, practical tips, and real-world applications."
      },
      {
        question: "How long does it take to complete a mission?",
        answer: "Mission duration varies based on complexity. Simple missions like 'Mulching Challenge' can be completed in a few days, while comprehensive ones like 'Complete Organic Transition' may take several weeks. Each mission is designed to fit into your regular farming schedule."
      },
      {
        question: "What happens after I complete a mission?",
        answer: "Upon completion, you'll receive a digital certificate, earn points for our rewards system, and unlock new advanced missions. Your progress is tracked in your dashboard, and you can share your achievements with the community."
      },
      {
        question: "Can I get help if I'm stuck on a mission?",
        answer: "Absolutely! You can use our AI support chat for instant help, ask questions in the community forum, or connect with local farmers who have completed similar missions. Our support team is also available for complex queries."
      }
    ]
  },
  {
    title: "Community & Support",
    icon: <Users className="h-5 w-5" />,
    questions: [
      {
        question: "How does the community feature work?",
        answer: "Our community connects you with farmers in your area and across India. You can share experiences, ask questions, exchange seeds, and learn from others' success stories. We also organize local meetups and WhatsApp groups."
      },
      {
        question: "Is my personal information safe?",
        answer: "Yes, we take privacy seriously. Your personal information is encrypted and never shared with third parties without your consent. You control what information is visible to other community members."
      },
      {
        question: "How can I connect with farmers in my area?",
        answer: "Use our location-based community feature to find farmers near you. You can join local WhatsApp groups, participate in regional discussions, and attend community meetups organized through our platform."
      },
      {
        question: "What if I have a technical issue?",
        answer: "For technical issues, you can contact our support team through the AI chat widget or email us directly. We typically respond within 24 hours and provide solutions for common problems."
      }
    ]
  },
  {
    title: "Rewards & Recognition",
    icon: <Trophy className="h-5 w-5" />,
    questions: [
      {
        question: "What rewards can I earn?",
        answer: "You can earn digital certificates, training credits, recognition badges, and access to exclusive content. We also partner with agricultural organizations to provide real-world benefits like seed discounts and equipment access."
      },
      {
        question: "How does the points system work?",
        answer: "You earn points by completing missions, helping other farmers, and participating in community activities. Points can be redeemed for rewards, unlock advanced features, and demonstrate your sustainable farming expertise."
      },
      {
        question: "Are there any real-world benefits?",
        answer: "Yes! We partner with agricultural cooperatives, government schemes, and NGOs to provide real benefits like access to subsidized seeds, training programs, and recognition in local farming communities."
      },
      {
        question: "Can I showcase my achievements?",
        answer: "Your dashboard displays all your achievements, certificates, and progress. You can share your success stories with the community and even use your certificates for government scheme applications or cooperative memberships."
      }
    ]
  },
  {
    title: "Farming Practices",
    icon: <Leaf className="h-5 w-5" />,
    questions: [
      {
        question: "What sustainable farming practices does FarmGrow promote?",
        answer: "We focus on water conservation, soil health improvement, organic pest management, crop rotation, composting, mulching, and integrated farming systems. All practices are scientifically proven and adapted for Indian farming conditions."
      },
      {
        question: "Are the farming techniques suitable for all crops?",
        answer: "Our techniques are designed to be adaptable across different crops and regions. We provide crop-specific guidance for major Indian crops including rice, wheat, cotton, sugarcane, vegetables, and fruits."
      },
      {
        question: "How do I know if a practice will work on my farm?",
        answer: "Each mission includes soil and climate considerations, success stories from similar regions, and step-by-step implementation guides. Our AI assistant can also provide personalized recommendations based on your specific conditions."
      },
      {
        question: "What if a sustainable practice doesn't work for me?",
        answer: "Farming is location and condition-specific. If a practice doesn't work, our community and AI support can help troubleshoot. We also encourage sharing your experiences to help other farmers in similar situations."
      }
    ]
  },
  {
    title: "AI Support",
    icon: <MessageCircle className="h-5 w-5" />,
    questions: [
      {
        question: "How does the AI farming assistant work?",
        answer: "Our AI assistant is trained on sustainable farming practices, government schemes, and agricultural best practices. It can answer questions about crop management, pest control, soil health, and provide personalized recommendations."
      },
      {
        question: "What types of questions can I ask the AI?",
        answer: "You can ask about sustainable farming techniques, pest identification and control, soil improvement, water management, government schemes, post-harvest practices, and general agricultural advice. The AI is available 24/7."
      },
      {
        question: "Is the AI advice reliable?",
        answer: "Our AI is trained on verified agricultural data and best practices. However, we always recommend consulting with local agricultural experts for critical decisions. The AI provides guidance that should be adapted to your specific conditions."
      },
      {
        question: "Can the AI help with government scheme applications?",
        answer: "Yes! The AI can provide information about various government schemes, eligibility criteria, and application processes. It can also help you understand documentation requirements and deadlines."
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10 px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="p-2 rounded-full bg-background border border-border shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about FarmGrow, sustainable farming practices, 
            and how to make the most of our platform.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {category.icon}
                  </div>
                  {category.title}
                  <Badge variant="secondary" className="ml-auto">
                    {category.questions.length} questions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Still have questions?</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our AI support team is here to help 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support">
                  <Button className="w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with AI Support
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Users className="mr-2 h-4 w-4" />
                    Ask Community
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  )
}
