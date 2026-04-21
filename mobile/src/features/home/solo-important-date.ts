import AsyncStorage from "@react-native-async-storage/async-storage";
import appConfig from "@/src/core/config/app-config";

export type SoloImportantDateDraft = {
  title: string;
  memoryDate: string;
  description?: string;
  createdAt: string;
};

export async function getSoloImportantDate(): Promise<SoloImportantDateDraft | null> {
  try {
    const raw = await AsyncStorage.getItem(appConfig.storage.soloImportantDate);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<SoloImportantDateDraft>;
    if (!parsed.title || !parsed.memoryDate || !parsed.createdAt) {
      return null;
    }

    return {
      title: parsed.title,
      memoryDate: parsed.memoryDate,
      description: parsed.description,
      createdAt: parsed.createdAt,
    };
  } catch {
    return null;
  }
}

export async function setSoloImportantDate(
  draft: SoloImportantDateDraft,
): Promise<void> {
  await AsyncStorage.setItem(
    appConfig.storage.soloImportantDate,
    JSON.stringify(draft),
  );
}
