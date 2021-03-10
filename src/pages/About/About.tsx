import React from "react";
import i18n from "../../i18n";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./About.scss";
import { TemplatePage } from "../../Components/TemplatePage";
import { Section } from "../../types/section";
import { TemplateSection } from "../../Components/TemplateSection";
import { Helmet } from "react-helmet";

export function About() {

  function GalleryItem(
      type:string,
      title:string,
      paragraphs:string[])
  {
    let alt = type.replace("_", " ");

    return (
      <div className='gallery-item'>
        <div className="gallery-item-icon">
          <img src={`images/about/${type}.svg`} alt={alt} />
        </div>
        <h3 className='sub-title'> {i18n.t('about.for')} <br/> {title} </h3>
        {paragraphs.map((p:string, index:number) => {
          return <div key={index} className="paragraph">{ p }</div>
        })}
      </div>
    )
  }

  function DetailsAbout() {

    let sections: Section[] = [
      {
        title: i18n.t("about.about_loco"),
        subtitle: i18n.t("about.text_1"),
        paragraphs: [i18n.t("about.text_2")]
      },
      {
        subtitle: i18n.t("about.text_3"),
        image: {
          src: 'images/about/locoshop.io.jpg',
          alt: 'Locoshop.io',
          width: 250
        },
        paragraphs: [i18n.t("about.text_4")],
      },
      {
        subtitle: i18n.t("about.text_5"),
        paragraphs: [i18n.t("about.text_6")],
      },
    ];

    return (
      <div className="about">
        <Helmet>
          <title>{i18n.t("about.about_loco")}</title>
          <meta name="description" content={i18n.t("about.about_loco")} />
        </Helmet>
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
        <div className="section section-gallery">

          {GalleryItem(
              'for_shoppers',
              i18n.t("about.shoppers"),
              [
                i18n.t("about.text_7"),
                i18n.t("about.text_8"),
              ]
          )}

          {GalleryItem(
              'for_retailers',
              i18n.t("about.retailers"),
              [
                i18n.t("about.text_9"),
                i18n.t("about.text_10"),
              ]
          )}

          {GalleryItem(
              'for_shop_malls',
              i18n.t("about.shop_malls"),
              [
                i18n.t("about.text_11"),
                i18n.t("about.text_12"),
              ]
          )}

          {GalleryItem(
              'for_brands',
              i18n.t("about.brands"),
              [
                i18n.t("about.text_13"),
                i18n.t("about.text_14"),
              ]
          )}
          
        </div>
      </div>
    );
  }

  return <TemplatePage content={DetailsAbout} />;
}
