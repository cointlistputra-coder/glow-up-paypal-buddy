import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter } from "../components/site";
import { Analytics } from "../components/analytics";
import { PreferencesProvider } from "../components/preferences";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Terjadi kendala saat memuat halaman
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Silakan muat ulang halaman atau kembali ke beranda.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Muat Ulang
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "TransferCepat — Jasa Convert Saldo PayPal, Jasa WD Limit Permanen & Mencairkan PayPal",
      },
      {
        name: "description",
        content:
          "Jasa convert saldo PayPal ke DANA, BCA, OVO, Mandiri, BRI tercepat 5-15 menit. Melayani jasa WD akun PayPal limit permanen 180 hari, mencairkan saldo, dan jasa bayar online terpercaya sejak 2018.",
      },
      {
        name: "keywords",
        content:
          "convert, jasa convert paypal, jasa wd, jasa wd paypal, mencairkan paypal, cairkan saldo paypal, akun paypal limit permanen, cara menarik saldo paypal limit 180 hari, paypal ke dana, paypal ke bca, jual beli saldo paypal, jasa bayar paypal, transfercepat, done cogel",
      },
      { name: "author", content: "TransferCepat by Done Cogel" },
      { property: "og:site_name", content: "TransferCepat" },
      {
        property: "og:title",
        content: "TransferCepat — Jasa Convert Saldo, Jasa WD & Mencairkan PayPal",
      },
      {
        property: "og:description",
        content:
          "Convert saldo PayPal ke DANA & Bank Lokal, jasa WD limit 180 hari, dan jasa bayar terpercaya sejak 2018.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://transfercepat.com" },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Schema.org Structured Data Resmi untuk Mesin Pencari Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "TransferCepat",
    "alternateName": "Done Cogel",
    "url": "https://transfercepat.com",
    "logo": "https://transfercepat.com/favicon.svg",
    "description":
      "Penyedia layanan jasa convert saldo PayPal, jasa WD limit permanen 180 hari, mencairkan saldo PayPal ke bank lokal dan dompet digital terpercaya di Indonesia.",
    "telephone": "+6288274325328",
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "$$",
    "areaServed": "ID",
    "paymentAccepted": "PayPal, Bank Transfer, DANA, GoPay, OVO",
  };

  return (
    <html lang="id">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <SiteHeader />
        <Analytics />
        <Outlet />
        <SiteFooter />
      </PreferencesProvider>
    </QueryClientProvider>
  );
}
