"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/**
 * Client tab shell for the Progress page. Panels are server-rendered and passed
 * in as slots, so all data fetching stays on the server; only the tab state is
 * client-side.
 */
export function ProgressTabs({
  overview,
  subjects,
  quizzes,
  exams,
}: {
  overview: React.ReactNode;
  subjects: React.ReactNode;
  quizzes: React.ReactNode;
  exams: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="overview" className="mt-8">
      {/* Short labels under sm so all four tabs stay visible on phones;
          overflow-x-auto remains the fallback at very narrow widths. */}
      <TabsList className="flex w-full max-w-full gap-1 overflow-x-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="subjects">
          <span className="sm:hidden">Subjects</span>
          <span className="hidden sm:inline">Subjects &amp; Skills</span>
        </TabsTrigger>
        <TabsTrigger value="quizzes">
          <span className="sm:hidden">Quizzes</span>
          <span className="hidden sm:inline">Quiz History</span>
        </TabsTrigger>
        <TabsTrigger value="exams">
          <span className="sm:hidden">Exams</span>
          <span className="hidden sm:inline">Exam History</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-6">
        {overview}
      </TabsContent>
      <TabsContent value="subjects" className="mt-6">
        {subjects}
      </TabsContent>
      <TabsContent value="quizzes" className="mt-6">
        {quizzes}
      </TabsContent>
      <TabsContent value="exams" className="mt-6">
        {exams}
      </TabsContent>
    </Tabs>
  );
}
