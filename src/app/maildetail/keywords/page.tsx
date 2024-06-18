"use client";

import AddedKeywordsList from "@/components/mailDetail/AddedKeywordsList";
import KeywordDetails from "@/components/mailDetail/KeywordDetails";
import KeywordSlider from "@/components/mailDetail/KeywordSlider";
import useGetGPTDataQueries from "@/hooks/queries/useGetGPTDataQuery";
import { getKeywordsInSentence } from "@/lib/util/utilFunctions";
import useMailDetailStore from "@/store/useMailDetailStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SelectKeywords() {
  const router = useRouter();
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState<number>(0);
  const { selectedText, keywords } = useMailDetailStore();
  const keywordsInSentence = getKeywordsInSentence(selectedText);
  const currentKeyword = keywordsInSentence[currentKeywordIndex];
  const isKeywordIncluded = keywords.includes(currentKeyword);
  const queries = useGetGPTDataQueries(keywordsInSentence);

  // 추후 letterId로 동적 라우팅 처리
  useEffect(() => {
    if (!selectedText) {
      router.replace("/maildetail/");
    }
  }, [selectedText, router]);

  return (
    <section className="flex flex-col gap-y-3 h-full">
      <button className="bg-yellow-200" onClick={() => router.replace("/maildetail/")}>
        임시 되돌아가기 버튼
      </button>
      <KeywordSlider currentKeywordIndex={currentKeywordIndex} setCurrentKeywordIndex={setCurrentKeywordIndex} />
      <KeywordDetails
        currentKeyword={currentKeyword}
        isKeywordIncluded={isKeywordIncluded}
        gptData={queries[currentKeywordIndex]}
      />
      <AddedKeywordsList />
    </section>
  );
}

export default SelectKeywords;
