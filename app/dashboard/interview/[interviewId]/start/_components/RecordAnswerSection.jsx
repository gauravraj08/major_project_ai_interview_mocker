"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [recordingTimeout, setRecordingTimeout] = useState(null); // Track the timer

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    // Combine results into the user answer
    results?.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const StartRecording = () => {
    setUserAnswer(""); // Clear previous answer
    setResults([]); // Clear previous results
    startSpeechToText();

    // Stop recording after 1 minute
    const timer = setTimeout(() => {
      stopSpeechToText();
      if (userAnswer.length > 0) {
        UpdateUserAnswer();
      }
    }, 60000);

    setRecordingTimeout(timer); // Save the timer to clear if needed
  };

  const StopRecording = () => {
    if (recordingTimeout) {
      clearTimeout(recordingTimeout); // Clear the timer if the user stops manually
      setRecordingTimeout(null);
    }
    stopSpeechToText();
    if (userAnswer.length > 0) {
      UpdateUserAnswer();
    }
  };

  const UpdateUserAnswer = async () => {
    if (!userAnswer || userAnswer.length < 10) return; // Avoid saving short or empty answers
    // console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt =
      `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, ` +
      `User Answer: ${userAnswer}. Based on the question and user answer, please give us a rating for the answer ` +
      `and feedback as areas of improvement, if any, in JSON format with 'rating' and 'feedback' fields.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error updating user answer:", error);
      toast("Failed to save the answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: 300,
            zIndex: 10,
          }}
        />
      </div>
      <div className="flex gap-4 my-10">
        <Button
          disabled={loading || isRecording}
          variant="outline"
          onClick={StartRecording}
        >
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Start Recording
          </h2>
        </Button>
        <Button
          disabled={loading || !isRecording}
          variant="outline"
          onClick={StopRecording}
        >
          <h2 className="text-red-600 flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
