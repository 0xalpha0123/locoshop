import React, { useEffect } from "react";
import "./TermsAgreement.scss";
import i18n from "../../i18n";
import { TemplatePage } from "../../Components/TemplatePage";
import { Section } from "../../types/section";
import { TemplateSection } from "../../Components/TemplateSection";
import { Helmet } from "react-helmet";

export function TermsAgreement() {
  function TermsAgreementContent() {

    useEffect(() => {
      window.scrollTo(0,0);
    })

    let sections:Section[] = [
      {
        title: i18n.t("agreement.title"),
        paragraphs: [
          i18n.t("agreement.text_1"),
          i18n.t("agreement.text_2"),
          i18n.t("agreement.text_3"),
          i18n.t("agreement.text_4"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_5"),
        paragraphs: [ i18n.t("agreement.text_6") ]
      },
      {
        subtitle:  i18n.t("agreement.text_7"),
        paragraphs: [
          i18n.t("agreement.text_8"),
          i18n.t("agreement.text_9"),
          i18n.t("agreement.text_10"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_11"),
        paragraphs: [
          i18n.t("agreement.text_12"),
        ]
      },
      {
        aditionalClass: {
          section: 'section-gallery reduced-gallery no-margin',
          paragraphs: 'gallery-item'
        },
        paragraphs: [
          i18n.t("agreement.text_13"),
          i18n.t("agreement.text_14"),
          i18n.t("agreement.text_15"),
          i18n.t("agreement.text_16"),
        ]
      },
      {
        paragraphs: [
          i18n.t("agreement.text_17"),
          i18n.t("agreement.text_18"),
          i18n.t("agreement.text_19"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_20"),
        paragraphs: [
          i18n.t("agreement.text_21"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_22"),
        paragraphs: [
          i18n.t("agreement.text_23"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_24"),
        paragraphs: [
          i18n.t("agreement.text_25"),
        ]
      },
      {
        aditionalClass: {
          section: 'section-gallery reduced-gallery no-margin',
          paragraphs: 'gallery-item'
        },
        paragraphs: [
          i18n.t("agreement.text_26"),
          i18n.t("agreement.text_27"),
          i18n.t("agreement.text_28"),
          i18n.t("agreement.text_29"),
        ]
      },
      {
        aditionalClass: {
          section: "no-margin",
        },
        paragraphs: [
          i18n.t("agreement.text_31"),
        ]
      },
      {
        aditionalClass: {
          section: 'section-gallery reduced-gallery no-margin',
          paragraphs: 'gallery-item'
        },
        paragraphs: [
          `1. ${i18n.t("agreement.text_31_a")}`,
          `2. ${i18n.t("agreement.text_31_b")}`,
          `3. ${i18n.t("agreement.text_31_c")}`,
          `4. ${i18n.t("agreement.text_31_d")}`,
        ]
      },
      {
        paragraphs: [
          i18n.t("agreement.text_33"),
          i18n.t("agreement.text_34"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_35"),
        paragraphs: [
          i18n.t("agreement.text_36"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_37"),
        paragraphs: [
          i18n.t("agreement.text_38"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_39"),
        paragraphs: [
          i18n.t("agreement.text_40"),
        ]
      },
      {
        aditionalClass: {
          section: 'section-gallery reduced-gallery no-margin',
          paragraphs: 'gallery-item'
        },
        paragraphs: [
          i18n.t("agreement.text_41"),
          i18n.t("agreement.text_42"),
          i18n.t("agreement.text_43"),
          i18n.t("agreement.text_44"),
        ]
      },
      {
        paragraphs: [
          i18n.t("agreement.text_45"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_46"),
        paragraphs: [
          i18n.t("agreement.text_47"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_48"),
        paragraphs: [
          i18n.t("agreement.text_49"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_50"),
        paragraphs: [
          i18n.t("agreement.text_51"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_52"),
        paragraphs: [
          i18n.t("agreement.text_53"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_54"),
        paragraphs: [
          i18n.t("agreement.text_55"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_56"),
        paragraphs: [
          i18n.t("agreement.text_57"),
        ]
      },
      {
        subtitle:  i18n.t("agreement.text_58"),
        paragraphs: [
          i18n.t("agreement.text_59"),
        ]
      },
      {
        paragraphs: [
          i18n.t("agreement.text_60"),
        ]
      },
    ]

    //adding justified class automaticaly to every sections
    sections.map((s:Section) => {
      if(!s.aditionalClass) s.aditionalClass = {}
      s.aditionalClass.section = s.aditionalClass.section ? s.aditionalClass.section + ' justified' : 'justified';
    })

    return (
      <>
      <Helmet><title>{i18n.t("agreement.title")}</title></Helmet>
      <div className="agreement">

        {sections.map((section: Section, index: number) => {
          return (
            <div key={index}>
              <TemplateSection
                aditionalClass={section.aditionalClass ?? {}}
                title={section.title ?? ''}
                subtitle={section.subtitle ?? ''}
                paragraphs={section.paragraphs ?? []}
                image={section.image ?? null}
              ></TemplateSection>
            </div>
          )
        })}

      </div>
      </>
    );
  }

  return <TemplatePage content={TermsAgreementContent} />;
}
