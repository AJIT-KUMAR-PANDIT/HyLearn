import React from "react";
import { Card, CardContent } from "./Card";
import UserImage from "../../assets/hylearn_img1.jpg";

const testimonials = [
  {
    id: 1,
    testimonial:
      "HyLearn has been a game-changer for me. The courses are engaging, informative, and have helped me develop new skills that I can apply in my career.",
    name: "Emily Chen",
    occupation: "Marketing Specialist",
  },
  {
    id: 2,
    testimonial:
      "I was blown away by the quality of the instructors and the support team at HyLearn. They're always available to answer questions and provide feedback.",
    name: "David Lee",
    occupation: "Software Engineer",
  },
  {
    id: 3,
    testimonial:
      "HyLearn's courses are well-structured and easy to follow. I've learned so much and I'm excited to apply my new skills in my job.",
    name: "Sarah Kim",
    occupation: "Data Analyst",
  },
  {
    id: 4,
    testimonial:
      "I've tried other online learning platforms, but HyLearn is by far the best. The instructors are knowledgeable and the courses are engaging.",
    name: "James Davis",
    occupation: "Product Manager",
  },
  {
    id: 5,
    testimonial:
      "HyLearn has helped me develop new skills and advance in my career. I highly recommend it to anyone looking to learn new things.",
    name: "Jessica Brown",
    occupation: "UX Designer",
  },
  {
    id: 6,
    testimonial:
      "I was skeptical at first, but HyLearn's courses are really good. The instructors are experienced and the support team is always available to help.",
    name: "Michael White",
    occupation: "DevOps Engineer",
  },
];

export default function Testimonials() {
  return (
    <section className="flex justify-center w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
          What Our Learners Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6 space-y-2">
                <p className="text-gray-500 dark:text-gray-400">
                  {testimonial.testimonial}
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    id="userImage"
                    className="bg-cover bg-center rounded-xl w-16 h-16"
                    style={{
                      backgroundImage: `url(${UserImage})`,
                    }}
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.occupation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
