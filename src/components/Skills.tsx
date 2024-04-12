import React, { useState } from 'react';
import { ISkills } from '../interface';

interface Props {
    skills: ISkills[] | undefined;
    onUpdateSkills: (skills: ISkills[]) => void;
}

export const Skills = ({ skills, onUpdateSkills }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [newSkillCategory, setNewSkillCategory] = useState<string>("");
    const [newSkill, setNewSkill] = useState<string>("");

    const handleAddSkillCategory = () => {
        if (newSkillCategory.trim() !== "") {
            const updatedSkills = [...(skills || []), { name: newSkillCategory, skills: [] }];
            onUpdateSkills(updatedSkills);
            setNewSkillCategory("");
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() !== "" && selectedCategory !== "") {
            const updatedSkills = (skills || []).map(skillCategory => {
                if (skillCategory.name === selectedCategory) {
                    return {
                        ...skillCategory,
                        skills: [...skillCategory.skills, newSkill]
                    };
                }
                return skillCategory;
            });
            onUpdateSkills(updatedSkills);
            setNewSkill("");
        }
    };

    return (
        <div className='skills-container'>
            <form>
            <h1>Skills</h1>
            <div className='input-container'>
                <input
                    type="text"
                    placeholder="Enter new skill category name"
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                />
                <button type="button" onClick={handleAddSkillCategory}>Add Skill Category</button>
            </div>
            <div className='input-container'>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select skill category</option>
                    {(skills || []).map(skillCategory => (
                        <option key={skillCategory.name} value={skillCategory.name}>{skillCategory.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                />
                <button type="button" onClick={handleAddSkill}>Add Skill</button>
            </div>
            </form>
        </div>
    );
}

