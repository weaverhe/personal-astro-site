import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {JSDOM} from "jsdom";
import Shape from "../../Atoms/Shape/Shape.astro";
import shapeStyles from "../../Atoms/Shape/Shape.module.css";
import photoStyles from "../../Atoms/PhotoContainer/PhotoContainer.module.css";
import badgeStyles from "../../Atoms/Badge/Badge.module.css";
import ruth7 from "../../../../.storybook/images/ruth-7.jpeg";
import styles from "./ArchPortrait.module.css";
import ArchPortrait from "./ArchPortrait.astro";

const baseProps = {
  imageSrc: ruth7,
  imageAlt: "Ruth giving tongue",
  badgeLabels: ["Bro", "Ruth", "Is", "Giving", "Tongue"],
};

// Render the ArchPortrait component and query each sub-component for testing
async function renderArchPortrait(props = {}) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(ArchPortrait, {
    props: {...baseProps, ...props},
  });
  const fragment = JSDOM.fragment(html);

  return {
    component: fragment.firstElementChild,
    sticker: fragment.querySelector(`.${styles.sticker}`),
    photo: fragment.querySelector(`.${styles.photo}`),
    badge: fragment.querySelector(`.${styles.badge}`),
  };
}

const pathsOf = (svg: ReturnType<Element["querySelector"]> | undefined) =>
  [...(svg?.querySelectorAll("path") ?? [])].map((p) => p.getAttribute("d"));

describe("ArchPortrait Component", () => {
  test("Renders all the elements", async () => {
    const {component, sticker, photo, badge} = await renderArchPortrait();

    // Base component
    expect(component?.classList.contains(styles.archPortrait)).toBe(true);

    // Sticker
    expect(sticker).not.toBeNull();
    expect(sticker?.classList.contains(shapeStyles.shape)).toBe(true);

    // PhotoContainer
    expect(photo).not.toBeNull();
    expect(photo?.classList.contains(photoStyles.container)).toBe(true);
    const img = photo?.querySelector("img");
    expect(img?.getAttribute("src")).toContain("ruth-7.jpeg");
    expect(img?.getAttribute("alt")).toBe(baseProps.imageAlt);

    // Badge
    expect(badge).not.toBeNull();
    expect(badge?.classList.contains(badgeStyles.badge)).toBe(true);
    for (const label of baseProps.badgeLabels) {
      expect(badge?.textContent).toContain(label);
    }
  });

  test("Applies the default props correctly", async () => {
    const {sticker, photo, badge} = await renderArchPortrait();

    // Sticker defaults (requires Shape render for SVG comparison))
    const container = await AstroContainer.create();
    const burstHtml = await container.renderToString(Shape, {
      props: {shape: "burst"},
    });
    const burst = JSDOM.fragment(burstHtml).querySelector("svg");
    expect(pathsOf(sticker)).toEqual(pathsOf(burst));
    expect(sticker?.classList.contains(shapeStyles.white)).toBe(true);

    // Photo defaults
    expect(photo?.classList.contains(photoStyles["frame-lilac"])).toBe(true);
    expect(photo?.classList.contains(photoStyles.arch)).toBe(true);
    expect(photo?.classList.contains(photoStyles.shadow)).toBe(true);

    // Badge defaults
    expect(badge?.classList.contains(badgeStyles.apricot)).toBe(true);
    expect(badge?.classList.contains(badgeStyles.blush)).toBe(false);
    expect(badge?.classList.contains(badgeStyles.spin)).toBe(true);
  });

  test("Applies custom style props correctly", async () => {
    const {component, sticker, photo, badge} = await renderArchPortrait({
      stickerShape: "heart",
      stickerColor: "pink",
      frameColor: "salmon",
      badgeColor: "peach",
      badgeSpin: false,
    });

    // Sticker
    const container = await AstroContainer.create();
    const heartHtml = await container.renderToString(Shape, {
      props: {shape: "heart"},
    });
    const heart = JSDOM.fragment(heartHtml).querySelector("svg");
    expect(pathsOf(sticker)).toEqual(pathsOf(heart));
    expect(sticker?.classList.contains(shapeStyles.pink)).toBe(true);

    // Photo
    expect(photo?.classList.contains(photoStyles["frame-salmon"])).toBe(true);

    // Badge
    expect(badge?.classList.contains(badgeStyles.peach)).toBe(true);
    expect(badge?.classList.contains(badgeStyles.spin)).toBe(false);
  });
});
