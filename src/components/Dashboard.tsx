import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Brain, AlertTriangle, TrendingDown, ArrowLeft, Lightbulb, Target, Heart, Clock, BookOpen, Coffee, Zap, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { StudentData } from "./InputForm";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar } from "recharts";

interface DashboardProps {
  data: StudentData;
  onBack: () => void;
  onStartOver: () => void;
}

interface RiskAnalysis {
  academicRisk: number;
  burnoutRisk: number;
  riskLevel: "low" | "medium" | "high";
  burnoutLevel: "low" | "medium" | "high";
  subjectRisks: { name: string; risk: number; fill: string }[];
  daysUntilExam: number;
  insights: { title: string; description: string; type: "success" | "warning" | "danger" }[];
  recommendations: { title: string; description: string; steps: string[]; icon: typeof Shield; priority: "high" | "medium" | "low" }[];
  quickTips: string[];
}

const Dashboard = ({ data, onBack, onStartOver }: DashboardProps) => {
  const analysis = useMemo((): RiskAnalysis => {
    const today = new Date();
    const examDay = new Date(data.examDate);
    const daysUntilExam = Math.max(1, Math.ceil((examDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    // Calculate academic risk (0-100)
    let academicRisk = 0;
    
    if (daysUntilExam < 7) academicRisk += 30;
    else if (daysUntilExam < 14) academicRisk += 20;
    else if (daysUntilExam < 30) academicRisk += 10;
    
    if (data.dailyStudyHours < 2) academicRisk += 25;
    else if (data.dailyStudyHours < 4) academicRisk += 15;
    else if (data.dailyStudyHours < 6) academicRisk += 5;
    
    academicRisk += (data.missedStudyDays / 7) * 25;
    academicRisk += (data.topicDifficulty / 100) * 20;
    academicRisk = Math.min(100, Math.round(academicRisk));

    // Calculate burnout risk
    let burnoutRisk = 0;
    burnoutRisk += (data.stressLevel / 5) * 40;
    if (data.dailyStudyHours > 8) burnoutRisk += 30;
    else if (data.dailyStudyHours > 6) burnoutRisk += 15;
    else if (data.dailyStudyHours < 2) burnoutRisk += 20;
    if (daysUntilExam < 7) burnoutRisk += 30;
    else if (daysUntilExam < 14) burnoutRisk += 20;
    else if (daysUntilExam < 21) burnoutRisk += 10;
    burnoutRisk = Math.min(100, Math.round(burnoutRisk));

    const getRiskLevel = (risk: number): "low" | "medium" | "high" => {
      if (risk < 35) return "low";
      if (risk < 65) return "medium";
      return "high";
    };

    const getSubjectColor = (risk: number) => {
      if (risk < 35) return "hsl(145, 63%, 49%)";
      if (risk < 65) return "hsl(36, 100%, 55%)";
      return "hsl(4, 77%, 57%)";
    };

    const subjectRisks = data.subjects.map((subject, index) => {
      const baseRisk = academicRisk + (index % 2 === 0 ? 15 : -10) + Math.floor(Math.random() * 15);
      const risk = Math.min(100, Math.max(10, baseRisk));
      return { name: subject, risk, fill: getSubjectColor(risk) };
    });

    // Generate detailed insights
    const insights: { title: string; description: string; type: "success" | "warning" | "danger" }[] = [];
    
    if (academicRisk >= 65) {
      insights.push({
        title: "High Failure Risk Detected",
        description: `With ${daysUntilExam} days left and ${data.dailyStudyHours}h daily study, you need ${Math.ceil((100 - academicRisk) / 10)} more hours/day to catch up. Your ${data.missedStudyDays} missed days have created a ${Math.round(data.missedStudyDays * 2.5)}% knowledge gap.`,
        type: "danger"
      });
    } else if (academicRisk >= 35) {
      insights.push({
        title: "Moderate Risk - Room for Improvement",
        description: `You're studying ${data.dailyStudyHours}h/day which is ${data.dailyStudyHours < 4 ? "below average" : "adequate"}. With ${daysUntilExam} days left, increasing by 1-2 hours can reduce your risk by 15-20%.`,
        type: "warning"
      });
    } else {
      insights.push({
        title: "You're On Track!",
        description: `Great progress! Your ${data.dailyStudyHours}h daily study with ${7 - data.missedStudyDays} active days/week puts you ahead of 70% of students.`,
        type: "success"
      });
    }

    if (burnoutRisk >= 65) {
      insights.push({
        title: "Burnout Warning",
        description: `Stress level ${data.stressLevel}/5 combined with ${data.dailyStudyHours > 6 ? "excessive" : "irregular"} study hours indicates burnout. Energy typically drops 40% when burned out, making study ineffective.`,
        type: "danger"
      });
    } else if (burnoutRisk >= 35 && data.stressLevel >= 3) {
      insights.push({
        title: "Stress Building Up",
        description: `Your stress level (${data.stressLevel}/5) is elevated. Students at this level retain 25% less information. Consider 10-min breaks every 45 mins.`,
        type: "warning"
      });
    }

    const weakestSubject = subjectRisks.sort((a, b) => b.risk - a.risk)[0];
    if (weakestSubject && weakestSubject.risk >= 50) {
      insights.push({
        title: `Focus Area: ${weakestSubject.name}`,
        description: `${weakestSubject.name} shows ${weakestSubject.risk}% risk - allocate 40% of your study time here. Start with foundational concepts before advanced topics.`,
        type: weakestSubject.risk >= 65 ? "danger" : "warning"
      });
    }

    // Generate specific recommendations
    const recommendations: { title: string; description: string; steps: string[]; icon: typeof Shield; priority: "high" | "medium" | "low" }[] = [];

    if (daysUntilExam <= 7) {
      recommendations.push({
        title: "Emergency 7-Day Plan",
        description: `With only ${daysUntilExam} days left, every hour counts. Focus on high-yield topics only.`,
        steps: [
          `Day 1-2: Review ${weakestSubject?.name || "weakest subject"} core concepts only`,
          "Day 3-4: Practice problems from past papers (aim for 20+ questions/day)",
          "Day 5-6: Revise all formulas, definitions, and key facts",
          "Day 7: Light review + rest. Sleep 8 hours before exam"
        ],
        icon: Zap,
        priority: "high"
      });
    } else if (daysUntilExam <= 14) {
      recommendations.push({
        title: "2-Week Intensive Strategy",
        description: "You have time to cover everything if you're strategic.",
        steps: [
          `Week 1: Complete all ${data.subjects.join(", ")} syllabus with notes`,
          "Daily: 2 hours theory + 1 hour practice problems",
          "Week 2: Focus on weak areas and past paper practice",
          "Last 3 days: Revision only, no new topics"
        ],
        icon: Target,
        priority: "high"
      });
    }

    if (data.dailyStudyHours < 4) {
      recommendations.push({
        title: "Increase Study Time Gradually",
        description: `You're at ${data.dailyStudyHours}h/day. Aim for ${Math.min(6, data.dailyStudyHours + 2)}h for optimal results.`,
        steps: [
          `Tomorrow: Add 30 minutes (total ${data.dailyStudyHours + 0.5}h)`,
          "Day 3: Add another 30 minutes",
          "Use phone timer - study 25 min, break 5 min (Pomodoro)",
          "Study your hardest subject when most alert (usually morning)"
        ],
        icon: Clock,
        priority: academicRisk >= 50 ? "high" : "medium"
      });
    }

    if (data.missedStudyDays >= 3) {
      recommendations.push({
        title: "Build Consistent Habits",
        description: `${data.missedStudyDays} missed days/week creates gaps. Consistency beats intensity.`,
        steps: [
          "Set a fixed study time (e.g., 6-8 PM daily)",
          "Start with just 30 minutes on 'off' days - something is better than nothing",
          "Use a habit tracker app or calendar to mark study days",
          "Reward yourself after completing a study streak"
        ],
        icon: BookOpen,
        priority: "medium"
      });
    }

    if (burnoutRisk >= 50 || data.stressLevel >= 4) {
      recommendations.push({
        title: "Prevent Burnout Now",
        description: "High stress reduces memory retention by 30%. Recovery is essential.",
        steps: [
          "Take a 10-min walk after every 2 hours of study",
          "Sleep 7-8 hours minimum - memory consolidates during sleep",
          "Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s",
          "Schedule 1 hour of non-study activity daily (exercise, hobby)"
        ],
        icon: Heart,
        priority: "high"
      });
    }

    if (data.topicDifficulty >= 66) {
      recommendations.push({
        title: "Tackle Difficult Topics",
        description: "Hard topics need different strategies than easy ones.",
        steps: [
          "Break complex topics into 3-5 smaller sub-topics",
          "Watch YouTube explanations before reading textbooks",
          "Teach the concept out loud (even to yourself)",
          "Do 5 practice problems per difficult concept"
        ],
        icon: Brain,
        priority: "medium"
      });
    }

    // Quick tips based on situation
    const quickTips: string[] = [];
    if (daysUntilExam <= 3) quickTips.push("🎯 Focus on frequently tested topics only");
    if (data.stressLevel >= 4) quickTips.push("🧘 Take 3 deep breaths before each study session");
    if (data.dailyStudyHours >= 8) quickTips.push("⚡ Quality > Quantity. 6 focused hours beat 10 distracted hours");
    if (data.missedStudyDays >= 2) quickTips.push("📅 Study at the same time daily to build momentum");
    quickTips.push("💡 Review notes within 24 hours - retention jumps from 20% to 80%");
    quickTips.push("🎧 Lo-fi or classical music can improve focus by 15%");

    return {
      academicRisk,
      burnoutRisk,
      riskLevel: getRiskLevel(academicRisk),
      burnoutLevel: getRiskLevel(burnoutRisk),
      subjectRisks,
      daysUntilExam,
      insights,
      recommendations,
      quickTips: quickTips.slice(0, 4),
    };
  }, [data]);

  const getRiskColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-danger";
    }
  };

  const getRiskBg = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low": return "bg-success/10 border-success/20";
      case "medium": return "bg-warning/10 border-warning/20";
      case "high": return "bg-danger/10 border-danger/20";
    }
  };

  const getInsightIcon = (type: "success" | "warning" | "danger") => {
    switch (type) {
      case "success": return CheckCircle2;
      case "warning": return AlertTriangle;
      case "danger": return XCircle;
    }
  };

  const getInsightColor = (type: "success" | "warning" | "danger") => {
    switch (type) {
      case "success": return "text-success bg-success/10 border-success/20";
      case "warning": return "text-warning bg-warning/10 border-warning/20";
      case "danger": return "text-danger bg-danger/10 border-danger/20";
    }
  };

  const radialData = [
    { name: "Risk", value: analysis.academicRisk, fill: analysis.riskLevel === "low" ? "#2ECC71" : analysis.riskLevel === "medium" ? "#F5A623" : "#E74C3C" }
  ];

  return (
    <section className="min-h-screen gradient-hero py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Inputs
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Your Risk Analysis
              </h1>
              <p className="text-muted-foreground">
                {analysis.daysUntilExam} days until your exam • {data.subjects.length} subject{data.subjects.length > 1 ? "s" : ""} analyzed
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">{analysis.daysUntilExam}</span>
              <span className="text-muted-foreground">days left</span>
            </div>
          </div>
        </motion.div>

        {/* Risk Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl shadow-card border-2 ${getRiskBg(analysis.riskLevel)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                      <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(var(--muted))" }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Academic Risk</h3>
                  <p className="text-sm text-muted-foreground">Chance of underperforming</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-bold ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.academicRisk}%
                </p>
                <p className={`text-sm font-medium capitalize ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel} Risk
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl shadow-card border-2 ${getRiskBg(analysis.burnoutLevel)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl ${getRiskBg(analysis.burnoutLevel)} flex items-center justify-center`}>
                  <Coffee className={`w-8 h-8 ${getRiskColor(analysis.burnoutLevel)}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Burnout Risk</h3>
                  <p className="text-sm text-muted-foreground">Mental exhaustion level</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-bold ${getRiskColor(analysis.burnoutLevel)}`}>
                  {analysis.burnoutRisk}%
                </p>
                <p className={`text-sm font-medium capitalize ${getRiskColor(analysis.burnoutLevel)}`}>
                  {analysis.burnoutLevel} Risk
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Tips Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-8"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {analysis.quickTips.map((tip, index) => (
                <span key={index} className="text-sm text-foreground">{tip}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Key Insights
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.insights.map((insight, index) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                  className={`p-5 rounded-xl border-2 ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Subject-wise Risk Chart */}
        {analysis.subjectRisks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-card shadow-card border border-border/50 mb-8"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Subject-wise Risk</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis.subjectRisks} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 13 }} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Risk"]} />
                  <Bar dataKey="risk" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              💡 Tip: Spend more time on subjects with higher risk scores. A 10% improvement in your weakest subject has more impact than 10% in your strongest.
            </p>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Action Plan
          </h3>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="p-6 rounded-xl bg-card shadow-card border border-border/50 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    rec.priority === "high" ? "bg-danger/10" : rec.priority === "medium" ? "bg-warning/10" : "bg-success/10"
                  }`}>
                    <rec.icon className={`w-6 h-6 ${
                      rec.priority === "high" ? "text-danger" : rec.priority === "medium" ? "text-warning" : "text-success"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{rec.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        rec.priority === "high" ? "bg-danger/10 text-danger" : 
                        rec.priority === "medium" ? "bg-warning/10 text-warning" : 
                        "bg-success/10 text-success"
                      }`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <div className="space-y-2">
                      {rec.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-primary">{stepIndex + 1}</span>
                          </div>
                          <p className="text-sm text-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button variant="hero" size="lg" onClick={onStartOver}>
            Start New Analysis
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.print()}>
            Save Report
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
