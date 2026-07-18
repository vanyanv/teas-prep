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
      <TabsList className="flex w-full max-w-full gap-1 overflow-x-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="subjects">Subjects &amp; Skills</TabsTrigger>
        <TabsTrigger value="quizzes">Quiz History</TabsTrigger>
        <TabsTrigger value="exams">Exam History</TabsTrigger>
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
