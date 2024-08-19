import Blog from "./Blog";
import image1 from "../Images/demo-fashion-blog-img-01.webp";
import image2 from "../Images/Blog2.webp";
import image3 from "../Images/Blog3.webp";
import HeadersComp from "../../Components/Headers";

const Blogs: React.FC = () => {
  const BlogsContent = [
    {
      date: "16 Feb  2024",
      author: "Dannetworks",
      image: image1,
      description: "Woke up feeling like Virgil Abloh ",
    },
    {
      date: "16 Feb  2024",
      author: "Dannetworks",
      image: image2,
      description: "Why I style better than Virgil Abloh",
    },
    {
      date: "16 Feb  2024",
      author: "Dannetworks",
      image: image3,
      description: "20 ways you can style your Nike lows like Roddy Ricch",
    },
  ];
  return (
    <div>
      <div>
        <HeadersComp label="BLOGS" />
      </div>

      <div className=" ">
        <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
          {BlogsContent.map((blog, index) => (
            <Blog
              date={blog.date}
              author={blog.author}
              description={blog.description}
              image={blog.image}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
