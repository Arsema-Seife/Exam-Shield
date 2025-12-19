import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar, BookOpen, Clock, AlertTriangle, Brain, ArrowLeft, X, Plus } from "lucide-react";
import { motion } from "framer-motion";

export interface StudentData {
  subjects: string[];
  examDate: string;
  dailyStudyHours: number;
  missedStudyDays: number;
  topicDifficulty: number;
  stressLevel: number;
}

interface InputFormProps {
  onSubmit: (data: StudentData) => void;
  onBack: () => void;
}

const InputForm = ({ onSubmit, onBack }: InputFormProps) => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [dailyStudyHours, setDailyStudyHours] = useState(4);
  const [missedStudyDays, setMissedStudyDays] = useState(2);
  const [topicDifficulty, setTopicDifficulty] = useState([50]);
  const [stressLevel, setStressLevel] = useState([3]);

  const addSubject = () => {
    if (currentSubject.trim() && !subjects.includes(currentSubject.trim())) {
      setSubjects([...subjects, currentSubject.trim()]);
      setCurrentSubject("");
    }
  };

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subjects,
      examDate,
      dailyStudyHours,
      missedStudyDays,
      topicDifficulty: topicDifficulty[0],
      stressLevel: stressLevel[0],
    });
  };

  const getDifficultyLabel = (value: number) => {
    if (value < 33) return "Easy";
    if (value < 66) return "Medium";
    return "Hard";
  };

  const getStressLabel = (value: number) => {
    const labels = ["Very Low", "Low", "Moderate", "High", "Very High"];
    return labels[value - 1] || "Moderate";
  };

  return (
    <section className="min-h-screen gradient-hero py-24 px-4">
      <div className="container max-w-4xl mx-auto">
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
            Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Tell Us About Your Studies
          </h1>
          <p className="text-muted-foreground">
            We'll analyze your situation and predict potential risks
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Subjects */}
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Subjects</Label>
                    <p className="text-sm text-muted-foreground">Add subjects you're studying</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={currentSubject}
                    onChange={(e) => setCurrentSubject(e.target.value)}
                    placeholder="e.g., Mathematics"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
                  />
                  <Button type="button" variant="outline" onClick={addSubject}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <span
                      key={subject}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {subject}
                      <button type="button" onClick={() => removeSubject(subject)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {subjects.length === 0 && (
                    <span className="text-sm text-muted-foreground">No subjects added yet</span>
                  )}
                </div>
              </div>

              {/* Exam Date */}
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Exam Date</Label>
                    <p className="text-sm text-muted-foreground">When is your next exam?</p>
                  </div>
                </div>
                <Input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Daily Study Hours */}
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Daily Study Hours</Label>
                    <p className="text-sm text-muted-foreground">How many hours do you study daily?</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={dailyStudyHours}
                    onChange={(e) => setDailyStudyHours(Number(e.target.value))}
                    min={0}
                    max={16}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">hours/day</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Missed Study Days */}
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-danger" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Missed Study Days</Label>
                    <p className="text-sm text-muted-foreground">Days missed in the last week</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={missedStudyDays}
                    onChange={(e) => setMissedStudyDays(Number(e.target.value))}
                    min={0}
                    max={7}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">days/week</span>
                </div>
              </div>

              {/* Topic Difficulty */}
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Topic Difficulty</Label>
                    <p className="text-sm text-muted-foreground">How difficult are your topics?</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Slider
                    value={topicDifficulty}
                    onValueChange={setTopicDifficulty}
                    max={100}
                    step={1}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Easy</span>
                    <span className="font-medium text-primary">{getDifficultyLabel(topicDifficulty[0])}</span>
                    <span className="text-muted-foreground">Hard</span>
                  </div>
                </div>
              </div>

              {/* Stress Level */}
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Stress Level</Label>
                    <p className="text-sm text-muted-foreground">Rate your current stress (1-5)</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Slider
                    value={stressLevel}
                    onValueChange={setStressLevel}
                    min={1}
                    max={5}
                    step={1}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Low</span>
                    <span className="font-medium text-warning">{getStressLabel(stressLevel[0])}</span>
                    <span className="text-muted-foreground">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center pt-4"
          >
            <Button
              type="submit"
              variant="hero"
              size="xl"
              disabled={subjects.length === 0 || !examDate}
              className="min-w-[250px]"
            >
              Analyze My Risk
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default InputForm;
