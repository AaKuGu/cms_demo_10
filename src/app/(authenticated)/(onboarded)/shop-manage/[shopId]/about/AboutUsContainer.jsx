// "use client";

// import { useState } from "react";
// import AboutUsForm from "./AboutUsForm";
// import { updateAboutUsAction } from "@/actions/AboutUs.actions";
// import { errorToast, successToast } from "@/lib/toast";

// export default function AboutUsContainer({ shopId, aboutUs }) {
//   // 1. Story Section State
//   const [story, setStory] = useState(
//     aboutUs?.story || {
//       isVisible: true,
//       order: 1,
//       heading: "Our Story",
//       content: "",
//       establishedYear: "",
//       coverImage: "",
//     }
//   );

//   // 2. Vision & Mission Section State
//   const [visionMission, setVisionMission] = useState(
//     aboutUs?.visionMission || {
//       isVisible: true,
//       order: 2,
//       vision: "",
//       mission: "",
//     }
//   );

//   // 3. Founder's Message Section State
//   const [foundersMessage, setFoundersMessage] = useState(
//     aboutUs?.foundersMessage || {
//       isVisible: false,
//       order: 3,
//       founderName: "",
//       designation: "Founder",
//       photo: "",
//       message: "",
//       signatureImage: "",
//     }
//   );

//   // 4. Milestones Section State
//   const [milestones, setMilestones] = useState(
//     aboutUs?.milestones || {
//       isVisible: true,
//       order: 4,
//       stats: [],
//     }
//   );

//   // 5. Team Section State
//   const [team, setTeam] = useState(
//     aboutUs?.team || {
//       isVisible: false,
//       order: 5,
//       heading: "Meet Our Team",
//       members: [],
//     }
//   );

//   // Page Visibility & Pending State
//   const [isVisible, setIsVisible] = useState(aboutUs?.isVisible ?? true);
//   const [isPending, setIsPending] = useState(false);

//   // Handlers for dynamic array items (Milestones & Stats)
//   const handleAddStat = () => {
//     setMilestones((prev) => ({
//       ...prev,
//       stats: [...prev.stats, { label: "", value: "", icon: "", order: prev.stats.length }],
//     }));
//   };

//   const handleRemoveStat = (index) => {
//     setMilestones((prev) => ({
//       ...prev,
//       stats: prev.stats.filter((_, i) => i !== index),
//     }));
//   };

//   const handleStatChange = (index, field, value) => {
//     setMilestones((prev) => ({
//       ...prev,
//       stats: prev.stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)),
//     }));
//   };

//   // Handlers for dynamic array items (Team Members)
//   const handleAddTeamMember = () => {
//     setTeam((prev) => ({
//       ...prev,
//       members: [
//         ...prev.members,
//         {
//           name: "",
//           designation: "",
//           photo: "",
//           bio: "",
//           yearsOfExperience: "",
//           socialLinks: { instagram: "", linkedin: "", facebook: "" },
//           order: prev.members.length,
//           isVisible: true,
//         },
//       ],
//     }));
//   };

//   const handleRemoveTeamMember = (index) => {
//     setTeam((prev) => ({
//       ...prev,
//       members: prev.members.filter((_, i) => i !== index),
//     }));
//   };

//   const handleTeamMemberChange = (index, field, value) => {
//     setTeam((prev) => ({
//       ...prev,
//       members: prev.members.map((member, i) =>
//         i === index ? { ...member, [field]: value } : member
//       ),
//     }));
//   };

//   // Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsPending(true);

//     const formData = new FormData();
//     formData.set("story", JSON.stringify(story));
//     formData.set("visionMission", JSON.stringify(visionMission));
//     formData.set("foundersMessage", JSON.stringify(foundersMessage));
//     formData.set("milestones", JSON.stringify(milestones));
//     formData.set("team", JSON.stringify(team));
//     formData.set("isVisible", String(isVisible));

//     const { data, error } = await updateAboutUsAction(formData, shopId);

//     setIsPending(false);

//     if (error) {
//       errorToast(error);
//       return;
//     }

//     successToast("About Us page updated successfully!");
//   };

//   return (
//     <AboutUsForm
//       story={story}
//       onStoryChange={setStory}
//       visionMission={visionMission}
//       onVisionMissionChange={setVisionMission}
//       foundersMessage={foundersMessage}
//       onFoundersMessageChange={setFoundersMessage}
//       milestones={milestones}
//       onMilestonesChange={setMilestones}
//       onAddStat={handleAddStat}
//       onRemoveStat={handleRemoveStat}
//       onStatChange={handleStatChange}
//       team={team}
//       onTeamChange={setTeam}
//       onAddTeamMember={handleAddTeamMember}
//       onRemoveTeamMember={handleRemoveTeamMember}
//       onTeamMemberChange={handleTeamMemberChange}
//       isVisible={isVisible}
//       onVisibleChange={setIsVisible}
//       onSubmit={handleSubmit}
//       isPending={isPending}
//     />
//   );
// }

"use client";

import { useState } from "react";
import AboutUsForm from "./AboutUsForm";
import { updateAboutUsAction } from "@/actions/AboutUs.actions";
import { errorToast, successToast } from "@/lib/toast";

// ============================================================================
// MOCK INITIAL DATA FOR TESTING (Remove MOCK_ABOUT_US or fallbacks after testing)
// ============================================================================
const MOCK_ABOUT_US = {
  isVisible: true,
  story: {
    isVisible: true,
    order: 1,
    heading: "Our Journey & Story",
    establishedYear: 2021,
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    content:
      "Founded in 2021, our store started with a simple goal: to create high-quality, sustainable products that bring value and style to everyday life. Over the years, we have grown from a small passionate team into a global brand serving thousands of happy customers daily.",
  },
  visionMission: {
    isVisible: true,
    order: 2,
    vision: "To empower individuals worldwide through seamless digital commerce and top-tier product quality.",
    mission: "Deliver exceptional craftsmanship, maintain absolute transparency, and ensure customer satisfaction at every touchpoint.",
  },
  foundersMessage: {
    isVisible: true,
    order: 3,
    founderName: "Alex Morgan",
    designation: "Founder & CEO",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    signatureImage: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=300&q=80",
    message:
      "Thank you for visiting our shop! When we launched, our promise was simple—never compromise on quality. Today, that commitment remains stronger than ever.",
  },
  milestones: {
    isVisible: true,
    order: 4,
    stats: [
      { label: "Happy Customers", value: "50,000+", icon: "users", order: 0 },
      { label: "Products Delivered", value: "120,000+", icon: "package", order: 1 },
      { label: "Countries Served", value: "35+", icon: "globe", order: 2 },
    ],
  },
  team: {
    isVisible: true,
    order: 5,
    heading: "Meet the Team Behind the Brand",
    members: [
      {
        name: "Sarah Jenkins",
        designation: "Head of Product",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
        bio: "Passionate about product engineering and user experience with 8+ years of e-commerce background.",
        yearsOfExperience: 8,
        socialLinks: {
          linkedin: "https://linkedin.com/in/sarahjenkins",
          instagram: "https://instagram.com/sarahj_dev",
          facebook: "",
        },
        order: 0,
        isVisible: true,
      },
      {
        name: "David Chen",
        designation: "Lead Designer",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
        bio: "Specializes in minimalist UI design and visual branding aesthetics.",
        yearsOfExperience: 5,
        socialLinks: {
          linkedin: "https://linkedin.com/in/davidchen",
          instagram: "",
          facebook: "",
        },
        order: 1,
        isVisible: true,
      },
    ],
  },
};

export default function AboutUsContainer({ shopId, aboutUs }) {
  // 1. Story Section State
  const [story, setStory] = useState(
    aboutUs?.story || MOCK_ABOUT_US.story
  );

  // 2. Vision & Mission Section State
  const [visionMission, setVisionMission] = useState(
    aboutUs?.visionMission || MOCK_ABOUT_US.visionMission
  );

  // 3. Founder's Message Section State
  const [foundersMessage, setFoundersMessage] = useState(
    aboutUs?.foundersMessage || MOCK_ABOUT_US.foundersMessage
  );

  // 4. Milestones Section State
  const [milestones, setMilestones] = useState(
    aboutUs?.milestones || MOCK_ABOUT_US.milestones
  );

  // 5. Team Section State
  const [team, setTeam] = useState(
    aboutUs?.team || MOCK_ABOUT_US.team
  );

  // Page Visibility & Pending State
  const [isVisible, setIsVisible] = useState(
    aboutUs?.isVisible ?? MOCK_ABOUT_US.isVisible
  );
  const [isPending, setIsPending] = useState(false);

  // Handlers for dynamic array items (Milestones & Stats)
  const handleAddStat = () => {
    setMilestones((prev) => ({
      ...prev,
      stats: [
        ...prev.stats,
        { label: "", value: "", icon: "", order: prev.stats.length },
      ],
    }));
  };

  const handleRemoveStat = (index) => {
    setMilestones((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const handleStatChange = (index, field, value) => {
    setMilestones((prev) => ({
      ...prev,
      stats: prev.stats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      ),
    }));
  };

  // Handlers for dynamic array items (Team Members)
  const handleAddTeamMember = () => {
    setTeam((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          name: "",
          designation: "",
          photo: "",
          bio: "",
          yearsOfExperience: "",
          socialLinks: { instagram: "", linkedin: "", facebook: "" },
          order: prev.members.length,
          isVisible: true,
        },
      ],
    }));
  };

  const handleRemoveTeamMember = (index) => {
    setTeam((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    setTeam((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.set("story", JSON.stringify(story));
    formData.set("visionMission", JSON.stringify(visionMission));
    formData.set("foundersMessage", JSON.stringify(foundersMessage));
    formData.set("milestones", JSON.stringify(milestones));
    formData.set("team", JSON.stringify(team));
    formData.set("isVisible", String(isVisible));

    const { data, error } = await updateAboutUsAction(formData, shopId);

    setIsPending(false);

    if (error) {
      errorToast(error);
      return;
    }

    successToast("About Us page updated successfully!");
  };

  return (
    <AboutUsForm
      story={story}
      onStoryChange={setStory}
      visionMission={visionMission}
      onVisionMissionChange={setVisionMission}
      foundersMessage={foundersMessage}
      onFoundersMessageChange={setFoundersMessage}
      milestones={milestones}
      onMilestonesChange={setMilestones}
      onAddStat={handleAddStat}
      onRemoveStat={handleRemoveStat}
      onStatChange={handleStatChange}
      team={team}
      onTeamChange={setTeam}
      onAddTeamMember={handleAddTeamMember}
      onRemoveTeamMember={handleRemoveTeamMember}
      onTeamMemberChange={handleTeamMemberChange}
      isVisible={isVisible}
      onVisibleChange={setIsVisible}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}