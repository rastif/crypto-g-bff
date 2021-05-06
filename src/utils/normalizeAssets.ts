const normalizeAssets = (
  assets: { id: string; name: string; details: { type: string } }[]
) =>
  assets
    .filter(({ name, details }) => name && details.type === "crypto")
    .map(({ id, name }) => ({ asset_id: id, name }));

export default normalizeAssets;
