
export const Footer = () => {
  return (
    <footer className="border-t border-border py-4 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Mandate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
