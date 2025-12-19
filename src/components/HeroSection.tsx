import { Button } from "@/components/ui/button";
import { Shield, Brain, TrendingUp, ArrowRight, Clock, CheckCircle, BarChart3, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const features = [
    {
      icon: Brain,
      title: "Smart Risk Analysis",
      description: "AI analyzes your study patterns, time constraints, and stress levels to predict academic risk accurately.",
    },
    {
      icon: TrendingUp,
      title: "Early Burnout Detection",
      description: "Get warned before burnout hits. Our system monitors warning signs and alerts you in time.",
    },
    {
      icon: Shield,
      title: "Prevention Strategies",
      description: "Receive personalized recommendations to stay on track and improve your academic performance.",
    },
    {
      icon: BarChart3,
      title: "Subject-wise Insights",
      description: "Identify weak subjects and focus your efforts where they matter most for better results.",
    },
  ];

  const steps = [
    {
      icon: Clock,
      step: "01",
      title: "Enter Your Details",
      description: "Tell us about your subjects, exam dates, study hours, and current stress levels.",
    },
    {
      icon: Brain,
      step: "02",
      title: "AI Analyzes Data",
      description: "Our algorithm processes your inputs to calculate academic and burnout risk scores.",
    },
    {
      icon: BarChart3,
      step: "03",
      title: "View Your Dashboard",
      description: "See your risk levels visualized with charts and detailed subject-wise breakdowns.",
    },
    {
      icon: Lightbulb,
      step: "04",
      title: "Get Recommendations",
      description: "Receive actionable advice tailored to your situation to improve your chances.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen gradient-hero overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <Shield className="w-4 h-4" />
              <span>AI-Powered Academic Protection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Stay Ahead of{" "}
              <span className="text-gradient">Academic Risks</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              ExamShield analyzes your study patterns, stress levels, and time constraints to predict academic risks and provide personalized prevention strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button variant="hero" size="xl" onClick={onGetStarted}>
                Analyze My Risk
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                Learn More
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
            >
              {[
                { value: "95%", label: "Accuracy" },
                { value: "10K+", label: "Students" },
                { value: "Free", label: "To Use" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Students
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay on top of your academic game and avoid last-minute stress.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 gradient-hero">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your personalized risk analysis in just a few simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-2xl bg-card shadow-card border border-border/50 text-center"
              >
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mt-4 mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="hero" size="xl" onClick={onGetStarted}>
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 md:p-12 rounded-3xl bg-primary/5 border border-primary/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Take Control of Your Academic Future?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of students who are already using ExamShield to stay ahead of academic risks and achieve better results.
            </p>
            <Button variant="hero" size="xl" onClick={onGetStarted}>
              Start Free Analysis
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">ExamShield</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ExamShield. Built for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HeroSection;
