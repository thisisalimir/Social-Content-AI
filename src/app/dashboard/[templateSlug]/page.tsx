"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentTemplates } from "@/lib/content-template";
import { Loader } from "lucide-react";
import { useState } from "react";
import Editor from "./_components/editor";
import { chatSession } from "@/lib/gemini-ai";
import axios from "axios";

interface templateSlugProps {
  templateSlug: string;
}

function TemplatePage({ params }: { params: templateSlugProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState<string>("");

  // Get Template
  const selectedTemplate = contentTemplates.find(
    (item) => item.slug === params.templateSlug
  );

  // Generate Content with AI
  const generateAIContent = async (formData: FormData) => {
    setIsLoading(true);

    try {
      // Get Inputs Data
      let dataSet = {
        title: formData.get("title"),
        description: formData.get("description"),
      };

      // Get AI Prompt
      const selectedPrompt = selectedTemplate?.aiPrompt;
      // Prepare our Final Message with title, desc and AI prompt
      const finalAIPrompt = JSON.stringify(dataSet) + ", " + selectedPrompt;
      // Send Message to AI
      const result = await chatSession.sendMessage(finalAIPrompt);

      setAIOutput(result.response.text());

      // Send result to DB
      const response = await axios.post("/api/", {
        title: dataSet.title,
        description: result.response.text(),
        templateUsed: selectedTemplate?.name,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit Data
  const onSubmit = async (formData: FormData) => {
    generateAIContent(formData);
  };

  return (
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2 className="font-medium">{selectedTemplate?.name}</h2>
      </div>

      <form action={onSubmit}>
        <div className="flex flex-col gap-4 p-5 mt-5 bg-white">
          {selectedTemplate?.form?.map((form) => (
            <div key={selectedTemplate.slug}>
              <label>{form.label}</label>
              {form.field === "input" ? (
                <div className="mt-5">
                  <Input name="title"></Input>
                </div>
              ) : (
                <div className="mt-5">
                  <Textarea name="description" />
                </div>
              )}
            </div>
          ))}
        </div>
        <Button className="mt-5" type="submit">
          {isLoading ? (
            <Loader className="animate-spin"></Loader>
          ) : (
            "Generate Content"
          )}
        </Button>
      </form>
      <div className="my-10">
        <Editor value={isLoading ? "Generating..." : aiOutput} />
      </div>
    </div>
  );
}
export default TemplatePage;
