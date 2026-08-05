"use client";

import ImageUpload from "@/components/ImageUpload";

export default function AboutUsForm({
  story,
  onStoryChange,
  visionMission,
  onVisionMissionChange,
  foundersMessage,
  onFoundersMessageChange,
  milestones,
  onMilestonesChange,
  onAddStat,
  onRemoveStat,
  onStatChange,
  team,
  onTeamChange,
  onAddTeamMember,
  onRemoveTeamMember,
  onTeamMemberChange,
  isVisible,
  onVisibleChange,
  onSubmit,
  isPending = false,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Top Global Visibility Banner */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div>
          <p className="text-sm font-medium text-gray-900">About Us Page Visibility</p>
          <p className="text-xs text-slate-500">Enable or disable this page on your storefront</p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={isVisible}
            onChange={(e) => onVisibleChange(e.target.checked)}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-300"
          />
          Show on storefront
        </label>
      </div>

      {/* 1. SECTION: OUR STORY */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-gray-900">1. Our Story</p>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={story.isVisible}
              onChange={(e) => onStoryChange({ ...story, isVisible: e.target.checked })}
            />
            Show section
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Section Heading</label>
            <input
              type="text"
              placeholder="e.g. Our Story"
              value={story.heading}
              onChange={(e) => onStoryChange({ ...story, heading: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Established Year</label>
            <input
              type="number"
              placeholder="e.g. 2020"
              value={story.establishedYear || ""}
              onChange={(e) =>
                onStoryChange({
                  ...story,
                  establishedYear: e.target.value ? Number(e.target.value) : "",
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Cover Image</label>
            <ImageUpload
              value={story.coverImage}
              onChange={(url) => onStoryChange({ ...story, coverImage: url })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Story Content</label>
            <textarea
              rows={4}
              placeholder="Tell your customers how your shop started..."
              value={story.content}
              onChange={(e) => onStoryChange({ ...story, content: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>
      </div>

      {/* 2. SECTION: VISION & MISSION */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-gray-900">2. Vision & Mission</p>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={visionMission.isVisible}
              onChange={(e) =>
                onVisionMissionChange({ ...visionMission, isVisible: e.target.checked })
              }
            />
            Show section
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Our Vision</label>
            <textarea
              rows={3}
              placeholder="What is your long-term goal?"
              value={visionMission.vision}
              onChange={(e) =>
                onVisionMissionChange({ ...visionMission, vision: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Our Mission</label>
            <textarea
              rows={3}
              placeholder="What is your purpose and promise?"
              value={visionMission.mission}
              onChange={(e) =>
                onVisionMissionChange({ ...visionMission, mission: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>
      </div>

      {/* 3. SECTION: FOUNDER'S MESSAGE */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-gray-900">3. Founder's Message</p>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={foundersMessage.isVisible}
              onChange={(e) =>
                onFoundersMessageChange({ ...foundersMessage, isVisible: e.target.checked })
              }
            />
            Show section
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Founder Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={foundersMessage.founderName}
              onChange={(e) =>
                onFoundersMessageChange({ ...foundersMessage, founderName: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Designation</label>
            <input
              type="text"
              placeholder="e.g. Founder & CEO"
              value={foundersMessage.designation}
              onChange={(e) =>
                onFoundersMessageChange({ ...foundersMessage, designation: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Founder Photo</label>
            <ImageUpload
              value={foundersMessage.photo}
              onChange={(url) =>
                onFoundersMessageChange({ ...foundersMessage, photo: url })
              }
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Signature Image</label>
            <ImageUpload
              value={foundersMessage.signatureImage}
              onChange={(url) =>
                onFoundersMessageChange({ ...foundersMessage, signatureImage: url })
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
            <textarea
              rows={4}
              placeholder="A personal note from the founder..."
              value={foundersMessage.message}
              onChange={(e) =>
                onFoundersMessageChange({ ...foundersMessage, message: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>
      </div>

      {/* 4. SECTION: MILESTONES & STATS */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-gray-900">4. Milestones & Stats</p>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={milestones.isVisible}
              onChange={(e) =>
                onMilestonesChange({ ...milestones, isVisible: e.target.checked })
              }
            />
            Show section
          </label>
        </div>

        <div className="space-y-3">
          {milestones.stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3 sm:flex-row sm:items-center"
            >
              <input
                type="text"
                placeholder="Label (e.g. Happy Customers)"
                value={stat.label}
                onChange={(e) => onStatChange(index, "label", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-1/3"
              />
              <input
                type="text"
                placeholder="Value (e.g. 10,000+)"
                value={stat.value}
                onChange={(e) => onStatChange(index, "value", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-1/3"
              />
              <input
                type="text"
                placeholder="Icon name/class (optional)"
                value={stat.icon}
                onChange={(e) => onStatChange(index, "icon", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-1/3"
              />
              <button
                type="button"
                onClick={() => onRemoveStat(index)}
                className="w-full shrink-0 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 sm:w-auto"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={onAddStat}
            className="w-full rounded-md border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 sm:w-auto"
          >
            + Add Milestone / Stat
          </button>
        </div>
      </div>

      {/* 5. SECTION: TEAM MEMBERS */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">5. Team Members</p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={team.isVisible}
              onChange={(e) => onTeamChange({ ...team, isVisible: e.target.checked })}
            />
            Show section
          </label>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Team Section Heading</label>
          <input
            type="text"
            placeholder="e.g. Meet Our Team"
            value={team.heading}
            onChange={(e) => onTeamChange({ ...team, heading: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="space-y-4">
          {team.members.map((member, index) => (
            <div
              key={index}
              className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Member #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => onRemoveTeamMember(index)}
                  className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs text-red-600 hover:bg-red-50"
                >
                  Remove Member
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={member.name}
                  onChange={(e) => onTeamMemberChange(index, "name", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
                <input
                  type="text"
                  placeholder="Designation / Role"
                  value={member.designation}
                  onChange={(e) => onTeamMemberChange(index, "designation", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Member Photo</label>
                  <ImageUpload
                    value={member.photo}
                    onChange={(url) => onTeamMemberChange(index, "photo", url)}
                  />
                </div>

                <div className="md:col-span-2">
                  <input
                    type="number"
                    placeholder="Years of Experience"
                    value={member.yearsOfExperience || ""}
                    onChange={(e) =>
                      onTeamMemberChange(
                        index,
                        "yearsOfExperience",
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Short Bio..."
                  value={member.bio}
                  onChange={(e) => onTeamMemberChange(index, "bio", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 md:col-span-2"
                />
              </div>

              {/* Social Links Sub-Fields */}
              <div className="grid gap-2 text-xs md:grid-cols-3">
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={member.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    onTeamMemberChange(index, "socialLinks", {
                      ...member.socialLinks,
                      linkedin: e.target.value,
                    })
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-300"
                />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  value={member.socialLinks?.instagram || ""}
                  onChange={(e) =>
                    onTeamMemberChange(index, "socialLinks", {
                      ...member.socialLinks,
                      instagram: e.target.value,
                    })
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-300"
                />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  value={member.socialLinks?.facebook || ""}
                  onChange={(e) =>
                    onTeamMemberChange(index, "socialLinks", {
                      ...member.socialLinks,
                      facebook: e.target.value,
                    })
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-300"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={onAddTeamMember}
            className="w-full rounded-md border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 sm:w-auto"
          >
            + Add Team Member
          </button>
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-60 sm:w-auto"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}