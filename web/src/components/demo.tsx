import React from "react";

 

const Demo = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        See KondoAI in Action
      </h2>
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/`}
          title="KondoAI Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <p className="text-center mt-6 text-gray-600">
        Watch our demo to see how KondoAI transforms cluttered spaces into
        organized havens.
      </p>
    </div>
  );
};

export default Demo;
