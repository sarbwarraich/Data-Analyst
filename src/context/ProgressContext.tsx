import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { CURRICULUM } from '../data/curriculumData';

interface SubjectStats {
  completed: number;
  total: number;
  percentage: number;
}

interface ProgressContextType {
  completedTopicIds: Set<string>;
  toggleTopicCompleted: (topicId: string) => void;
  markTopicCompleted: (topicId: string) => void;
  markTopicIncomplete: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  totalTopics: number;
  completedCount: number;
  overallPercentage: number;
  getSubjectStats: (subjectId: string) => SubjectStats;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'mtech_study_hub_completed_topics';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            return new Set(parsed);
          }
        }
      } catch (e) {
        console.warn('Failed to parse completed topics from localStorage', e);
      }
    }
    // Default initial seed with first foundational topic to give immediate visual feedback
    return new Set(['eda-foundations']);
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedTopicIds)));
    } catch (e) {
      // LocalStorage quota or privacy mode error
    }
  }, [completedTopicIds]);

  const toggleTopicCompleted = (topicId: string) => {
    setCompletedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const markTopicCompleted = (topicId: string) => {
    setCompletedTopicIds((prev) => {
      if (prev.has(topicId)) return prev;
      const next = new Set(prev);
      next.add(topicId);
      return next;
    });
  };

  const markTopicIncomplete = (topicId: string) => {
    setCompletedTopicIds((prev) => {
      if (!prev.has(topicId)) return prev;
      const next = new Set(prev);
      next.delete(topicId);
      return next;
    });
  };

  const isTopicCompleted = (topicId: string) => {
    return completedTopicIds.has(topicId);
  };

  const resetProgress = () => {
    setCompletedTopicIds(new Set());
  };

  // Compute total topics across curriculum
  const totalTopics = useMemo(() => {
    return CURRICULUM.reduce((acc, sub) => acc + sub.topics.length, 0);
  }, []);

  // Compute total completed count
  const completedCount = useMemo(() => {
    let count = 0;
    CURRICULUM.forEach((sub) => {
      sub.topics.forEach((top) => {
        if (completedTopicIds.has(top.id)) {
          count++;
        }
      });
    });
    return count;
  }, [completedTopicIds]);

  const overallPercentage = useMemo(() => {
    if (totalTopics === 0) return 0;
    return Math.round((completedCount / totalTopics) * 100);
  }, [completedCount, totalTopics]);

  // Compute subject-level stats
  const getSubjectStats = (subjectId: string): SubjectStats => {
    const subject = CURRICULUM.find((s) => s.id === subjectId);
    if (!subject || subject.topics.length === 0) {
      return { completed: 0, total: 0, percentage: 0 };
    }
    const total = subject.topics.length;
    const completed = subject.topics.filter((t) => completedTopicIds.has(t.id)).length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  return (
    <ProgressContext.Provider
      value={{
        completedTopicIds,
        toggleTopicCompleted,
        markTopicCompleted,
        markTopicIncomplete,
        isTopicCompleted,
        totalTopics,
        completedCount,
        overallPercentage,
        getSubjectStats,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
