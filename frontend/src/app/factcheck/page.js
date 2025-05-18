"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { FactCheckTool } from "@/components/factcheck/FactCheckTool";

export default function FactCheckPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Fact Checking Tool</h1>
        <FactCheckTool />
      </div>
    </MainLayout>
  );
} 