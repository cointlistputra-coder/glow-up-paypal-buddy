<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep public content in TanStack leaf routes with unique metadata; shared navigation and footer belong in the root layout so every page stays consistent.
- Keep exchange calculation and contact destinations in the browser-safe PayPal utility with tests so changes remain verifiable.
- Treat imported HTML as untrusted content; never copy embedded authentication credentials or execute its scripts, because client-side authorization is unsafe.
- Preserve imported articles as structured content separately from presentation so future design changes do not lose the original material.
- This refresh is frontend-only; do not imply that local member authentication or transaction records have been migrated until a secure Cloud migration is verified.
