const computerScienceImage =
  "https://images.unsplash.com/photo-1641736494173-e7d5775121b2?auto=format&fit=crop&q=80&w=2400";

export default function PageBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#2a4a6a] to-[#0f2638]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-1/4 h-1/2 w-1/2 rounded-full bg-[#D9A441]/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 h-1/2 w-1/2 rounded-full bg-[#85A0B8]/20 blur-3xl animate-pulse delay-1000" />
          <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35577A]/10 blur-3xl animate-pulse delay-2000" />
        </div>
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8EEF2' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.10] mix-blend-screen"
        style={{ backgroundImage: "url(" + computerScienceImage + ")" }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-paper/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>
    </>
  );
}
