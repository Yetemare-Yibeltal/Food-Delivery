export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background">
      {/* Temporary placeholder — sections added as we build them */}
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <span className="text-4xl">🍽️</span>
        </div>
        <h1 className="text-4xl font-heading font-black gradient-text">
          Yene Delivery
        </h1>
        <p className="font-amharic text-2xl text-muted-foreground">
          የኔ ዴሊቨሪ
        </p>
        <p className="text-muted-foreground max-w-md">
          Food delivery across Ethiopia — coming soon to your screen.
        </p>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Server is running successfully
        </div>
      </div>
    </div>
  );
}