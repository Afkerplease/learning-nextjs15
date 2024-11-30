import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
const questions = [
  {
    _id: "1",
    title: "how to learn react",
    description: "i want to learn react,can anyone help me?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "1",
      name: "john doe",
      image:
        "https://static.vecteezy.com/ti/vecteur-libre/p1/2002403-homme-avec-barbe-avatar-personnage-icone-isole-gratuit-vectoriel.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "how to learn javascript",
    description: "i want to learn react,can anyone help me?",
    tags: [
      { _id: "1", name: "javascript" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "1",
      name: "john doe",
      image:
        "https://img.freepik.com/vecteurs-premium/image-profil-avatar-homme-isolee-arriere-plan-image-profil-avatar-pour-homme_1293239-4866.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) => {
    // Match query against the title
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());

    // Match filter against tags or author name, adjust logic as needed
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLocaleLowerCase()
      : true;

    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className=" flex w-full flex-col-reverse  justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions </h1>
        <Button
          className=" primary-gradient min-h-[46px] px-4 py-3 !text-light-900  "
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section>
        <LocalSearch
          imgSrc={"/icons/search.svg"}
          placeholder="Search questions..."
          otherClasses="flex-1"
          route="/"
        />
      </section>
      <HomeFilter />
      <div className=" mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
