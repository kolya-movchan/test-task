export const scrollToSection = (target: string) => {
  const section = document.getElementById(target);

  if (section) {
    const sectionRect = section.getBoundingClientRect();
    const scrollOffset = sectionRect.top + window.pageYOffset - 50;
    
    window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
    console.log(sectionRect);
  }
};
