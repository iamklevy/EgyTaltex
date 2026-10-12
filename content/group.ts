// The companies in the Egytaltex group and who runs each step of the chain.

export type GroupCompany = { id: string; name: string; sister: boolean };

// TODO(owners): confirm the group's companies and what each one does (see company page "The group").
export const GROUP: GroupCompany[] = [
  { id: "gti", name: "Global Textile Industries", sister: true },
  { id: "egytaltex", name: "Egytaltex", sister: false },
  { id: "odiba", name: "Odiba Textile", sister: true },
  { id: "italian-touch", name: "Italian Touch", sister: true },
];

/** Who runs each step of the chain, in messages `home.journey` order. */
export const JOURNEY_OWNERS: { who: string; sister: boolean }[] = [
  { who: "Global Textile Industries", sister: true },
  { who: "Egytaltex", sister: false },
  { who: "Odiba Textile", sister: true },
  { who: "Egytaltex", sister: false },
  { who: "Egytaltex", sister: false },
  { who: "Egytaltex · Italian Touch", sister: false },
  { who: "Egytaltex", sister: false },
  { who: "Egytaltex", sister: false },
];
