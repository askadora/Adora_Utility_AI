import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { BoxIcon } from "@/icons";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Buttons | Adora Dashboard - UI Components",
  description: "Comprehensive button components showcase with various styles, sizes, and interactive states.",
};

export default function Buttons() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE BREADCRUMB - Navigation component
        - Provides context and navigation hierarchy
      */}
      <PageBreadcrumb pageTitle="Buttons" />
      
      {/* 
        BUTTON COMPONENTS GRID - CSS Grid Layout (2D)
        - Single column on mobile for better readability
        - Responsive spacing with gap utilities
      */}
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        
        {/* PRIMARY BUTTONS SECTION */}
        <ComponentCard 
          title="Primary Buttons" 
          desc="Main action buttons with solid background and high visual prominence"
        >
          {/* 
            BUTTON GROUP - FLEXBOX (1D) Layout
            - Row direction for horizontal alignment
            - Gap provides consistent spacing between buttons
            - Flex-wrap allows buttons to wrap on smaller screens
          */}
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="primary">
              Small Button
            </Button>
            <Button size="md" variant="primary">
              Medium Button
            </Button>
          </div>
        </ComponentCard>

        {/* PRIMARY BUTTONS WITH LEFT ICON */}
        <ComponentCard 
          title="Primary Buttons with Left Icon" 
          desc="Primary buttons enhanced with leading icons for better visual communication"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="primary" startIcon={<BoxIcon />}>
              Small with Icon
            </Button>
            <Button size="md" variant="primary" startIcon={<BoxIcon />}>
              Medium with Icon
            </Button>
          </div>
        </ComponentCard>

        {/* PRIMARY BUTTONS WITH RIGHT ICON */}
        <ComponentCard 
          title="Primary Buttons with Right Icon" 
          desc="Primary buttons with trailing icons, commonly used for actions like 'Next' or 'Submit'"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="primary" endIcon={<BoxIcon />}>
              Small with Icon
            </Button>
            <Button size="md" variant="primary" endIcon={<BoxIcon />}>
              Medium with Icon
            </Button>
          </div>
        </ComponentCard>

        {/* SECONDARY/OUTLINE BUTTONS */}
        <ComponentCard 
          title="Secondary Buttons" 
          desc="Outline buttons for secondary actions with subtle visual hierarchy"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="outline">
              Small Outline
            </Button>
            <Button size="md" variant="outline">
              Medium Outline
            </Button>
          </div>
        </ComponentCard>

        {/* OUTLINE BUTTONS WITH LEFT ICON */}
        <ComponentCard 
          title="Outline Buttons with Left Icon" 
          desc="Secondary buttons with leading icons for enhanced usability"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
              Small Outline
            </Button>
            <Button size="md" variant="outline" startIcon={<BoxIcon />}>
              Medium Outline
            </Button>
          </div>
        </ComponentCard>

        {/* OUTLINE BUTTONS WITH RIGHT ICON */}
        <ComponentCard 
          title="Outline Buttons with Right Icon" 
          desc="Secondary buttons with trailing icons for directional or confirmatory actions"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="outline" endIcon={<BoxIcon />}>
              Small Outline
            </Button>
            <Button size="md" variant="outline" endIcon={<BoxIcon />}>
              Medium Outline
            </Button>
          </div>
        </ComponentCard>

        {/* BUTTON COMBINATIONS SHOWCASE */}
        <ComponentCard 
          title="Button Combinations" 
          desc="Common button groupings and layouts used in real-world applications"
        >
          {/* 
            BUTTON COMBINATIONS - Multiple FLEXBOX (1D) layouts
            - Different groupings demonstrate various use cases
            - Responsive spacing and alignment
          */}
          <div className="space-y-6">
            
            {/* Action Button Group */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Action Button Group
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="md" variant="primary">
                  Save Changes
                </Button>
                <Button size="md" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>

            {/* Navigation Button Group */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Navigation Button Group
              </h4>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button size="md" variant="outline" startIcon={<BoxIcon />}>
                  Previous
                </Button>
                <Button size="md" variant="primary" endIcon={<BoxIcon />}>
                  Next Step
                </Button>
              </div>
            </div>

            {/* Toolbar Button Group */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Toolbar Actions
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
                  Edit
                </Button>
                <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
                  Copy
                </Button>
                <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
