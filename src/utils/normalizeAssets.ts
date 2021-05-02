const normalizeAssets = (assets: { name: string }[]) =>
  assets.filter((asset: { name: string }) => asset.name);

export default normalizeAssets;
