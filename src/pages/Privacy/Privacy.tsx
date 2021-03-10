import React, { useEffect } from "react";
import "./Privacy.scss";
import i18n from "../../i18n";
import { TemplatePage } from "../../Components/TemplatePage";
import { TemplateSection } from "../../Components/TemplateSection";
import { Section } from "../../types/section";
import { Helmet } from "react-helmet";

export function Privacy() {
  function PrivacyContent() {

    useEffect(() => {
      window.scrollTo(0,0);
    })

    let sections:Section[] = [
      {
        title: i18n.t("privacy.title"),
        paragraphs: [
          i18n.t("privacy.text_1"),
          i18n.t("privacy.text_2")
        ]
      },
      {
        subtitle: i18n.t("privacy.text_3"),
        paragraphs: [i18n.t("privacy.text_4")]
      },
      {
        subtitle: i18n.t("privacy.text_5"),
        paragraphs: [
          i18n.t("privacy.text_6"),
          i18n.t("privacy.text_7"),
          i18n.t("privacy.text_8"),
          i18n.t("privacy.text_9"),
          i18n.t("privacy.text_10"),
          i18n.t("privacy.text_11"),
        ]
      },
      {
        subtitle: i18n.t("privacy.text_12"),
        paragraphs: [
          i18n.t("privacy.text_13"),
          i18n.t("privacy.text_14"),
          i18n.t("privacy.text_15"),
        ]
      },
      {
        subtitle: i18n.t("privacy.text_16"),
        paragraphs: [
          i18n.t("privacy.text_17"),
        ]
      },
      {
        aditionalClass: {
          section: 'section-gallery reduced-gallery',
          paragraphs: 'gallery-item'
        },
        paragraphs: [
          i18n.t("privacy.text_18"),
          i18n.t("privacy.text_19"),
          i18n.t("privacy.text_20"),
        ]
      },
      {
        paragraphs: [
          i18n.t("privacy.text_21"),
          i18n.t("privacy.text_22"),
        ]
      },
      {
        subtitle: i18n.t("privacy.text_23"),
        paragraphs: [
          i18n.t("privacy.text_24"),
        ]
      },
      {
        subtitle: i18n.t("privacy.text_25"),
        paragraphs: [
          i18n.t("privacy.text_26"),
        ]
      },
      {
        subtitle: i18n.t("privacy.text_27"),
        paragraphs: [
          i18n.t("privacy.text_28"),
        ]
      },
      {
        paragraphs: [
          i18n.t("privacy.text_29"),
        ]
      },
    ];

    //adding justified class automaticaly to every sections
    sections.map((s:Section) => {
      if(!s.aditionalClass) s.aditionalClass = {}
      s.aditionalClass.section = s.aditionalClass.section ? s.aditionalClass.section + ' justified' : 'justified';
    })

    return (
      <>
      <Helmet><title>{i18n.t("privacy.title")}</title></Helmet>
      <div className="privacy">

        {sections.map((section:Section, index:number) => {
          return(
            <div key={index}>
              <TemplateSection
                  aditionalClass={section.aditionalClass ?? {}}
                  title={section.title ?? ''}
                  subtitle={section.subtitle ?? ''}
                  paragraphs={section.paragraphs ?? []}
              ></TemplateSection>
            </div>
          )
        })}
                
      </div>
      </>
    );
  }

  return <TemplatePage content={PrivacyContent} />;
}
