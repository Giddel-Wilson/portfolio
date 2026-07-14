# Wilson — Portfolio

A cinematic, scroll-driven single-page portfolio built with SvelteKit, the
Spline runtime, GSAP/ScrollTrigger and Lenis. A 3D robot sits on a persistent
canvas behind the whole page: it starts at the right of the hero, translates
to center as you scroll into the About section, keeps a slow continuous zoom
going, then sinks and fades out at the waist as you scroll on toward Stack.

## Run it

```bash
npm install
npm run dev
```

Requires Node 20+.

## How the choreography actually works (read this if you're debugging it)

The right-start / translate / zoom / settle-gate / sink-fade sequence is
driven entirely by a plain CSS `transform` on the `<canvas>` element itself
(`src/lib/spline/canvasScroll.ts`), **not** by moving an object inside the
Spline scene. Earlier versions of this tried to move a named object's 3D
position, which meant everything depended on (a) knowing that object's exact
name inside a hosted scene I can't inspect, and (b) knowing that scene's
internal coordinate scale — neither of which I could ever actually verify.
That's why it kept silently failing.

Moving the whole canvas with `transform: translateX() translateY() scale()`
sidesteps both problems: browser CSS units (`vw`/`vh`) are universal
regardless of what's rendered inside the canvas, so this behavior no longer
depends on the Spline scene at all. The trade-off is that it moves the
*whole* scene, not an isolated object within it — fine here, since this
particular scene is just the robot on its own with nothing else in frame.

If you ever do want to move just the robot independently (e.g. an idle
rotation that runs even while the canvas itself is stationary), *that* still
needs the object name — the dev panel's object browser (see below) is still
there for exactly that, it's just no longer required for the core behavior.

## Tuning the choreography

Three constants at the top of `src/lib/spline/canvasScroll.ts`, all in
viewport-relative units so they behave the same on any screen size:

- **`START_X_VW`** — how many `vw` right of center the robot starts in the
  hero (26 = 26% of viewport width).
- **`SINK_Y_VH`** — how many `vh` it sinks as it hands off to Stack.
- **`ZOOM_TOTAL`** — total fractional scale growth across the whole journey.

## Before you ship this

- **`ROBOT_OBJECT_NAME`-equivalent** — there isn't one anymore for the core
  behavior. You can ignore the Spline object stuff entirely unless you want
  to art-direct the robot further (see above).
- **`Contact.svelte`** — real email, GitHub, LinkedIn, `/static/resume.pdf`.
- **Hero name** (`Hero.svelte`) — currently `"Wilson"`.
- **`src/lib/data/projects.ts`** — copy written from what I know of TrikRide,
  DefenseS, and EndToEnd Encrypt; check it reads the way you'd describe them.
- **Duplicate the Spline scene into your own account.** It currently points
  at someone else's hosted community scene — fine for prototyping, not for
  shipping. You don't control whether it changes or disappears.

## How the pieces fit together

- **`CanvasStage.svelte`** — fixed full-viewport canvas, lazy-loads
  `@splinetool/runtime` on mount (code-split, doesn't block first paint),
  loads the scene, forces its background to black
  (`app.setBackgroundColor('#000000')` — CSS alone won't override a
  background the scene paints itself).
- **`canvasScroll.ts`** — the actual choreography, described above. Wires up
  reactively as soon as both `scene.heroEl` and `scene.aboutEl` are
  registered (see below), independent of whether the Spline scene has
  finished loading yet.
- **`stores/scene.svelte.ts`** — `heroEl`/`aboutEl` are registered by
  `Hero.svelte`/`About.svelte` themselves on mount, rather than
  `CanvasStage` blindly calling `document.getElementById()` and hoping the
  timing works out. `robotSettled` flips to `true` once phase 1 finishes;
  `About.svelte` reads it directly and only plays its text reveal after
  that — not on a generic "scrolled into view" threshold.
- **`FilmLayer.svelte`** — lightweight CSS grain + vignette overlay for
  texture, since Spline renders in its own canvas/context and can't easily
  be piped through a Three.js `EffectComposer`.

### Dev panel (bottom-left, `npm run dev` only)

Now purely optional exploration tooling — confirms the canvas-transform
choreography is active regardless of any object name, and if you expand
"optional: target a specific object" it lists every object in the scene
(via the runtime's `getAllObjects()`) so you can look one up if you want to
animate the robot independently later. Nothing here gates the core behavior
anymore. Stripped from production builds.

## Fallback ladder

`src/lib/utils/device.ts` takes one honest read of the device on mount:

| Tier | Trigger | Behavior |
|---|---|---|
| `full` / `lite` | anything with WebGL | Spline scene loads normally |
| `static` | `prefers-reduced-motion` or no WebGL | no canvas is created at all — a static CSS gradient stands in |

Reduced motion also skips the canvas transform choreography even when the
scene does load (see `reducedMotion` in `canvasScroll.ts`) — though in
practice `prefers-reduced-motion` already forces the `static` tier, so this
mainly matters if you ever call `setupCanvasScroll` from somewhere else.

## Scroll feel

Lenis: `duration: 0.85`, ease-out-quart, `wheelMultiplier: 1.15` in
`src/lib/scroll/lenis.ts`. Drop `duration` further if you want it snappier
still — below about `0.5` it starts to feel like native scrolling with just
the edges smoothed off.
