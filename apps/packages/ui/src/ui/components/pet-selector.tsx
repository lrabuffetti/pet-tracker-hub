import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { CSSProperties } from "react";
import type { Pet } from "../../types/pet";

type PetSelectorProps = {
  pets: Pet[];
  selectedPetId: string | null;
  onSelect: (petId: string) => void;
  className?: string;
  style?: StyleProp<ViewStyle> | CSSProperties;
  emptyLabel?: string;
  disabled?: boolean;
};

export const PetSelector = ({
  pets,
  selectedPetId,
  onSelect,
  className,
  style,
  emptyLabel = "—",
  disabled = false,
}: PetSelectorProps) => {
  if (pets.length === 0) {
    if (Platform.OS === "web") {
      return (
        <p className="text-sm text-gray-500" style={style as CSSProperties}>
          {emptyLabel}
        </p>
      );
    }

    return (
      <Text style={styles.emptyLabel}>{emptyLabel}</Text>
    );
  }

  if (Platform.OS === "web") {
    return (
      <select
        value={selectedPetId ?? ""}
        disabled={disabled || pets.length <= 1}
        className={
          className ??
          "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 outline-none focus:border-indigo-500 disabled:cursor-default disabled:opacity-70"
        }
        style={style as CSSProperties}
        onChange={(event) => onSelect(event.target.value)}
      >
        {pets.map((pet) => (
          <option key={pet.id} value={pet.id}>
            {pet.name}
          </option>
        ))}
      </select>
    );
  }

  if (pets.length === 1) {
    return (
      <View style={[styles.singlePet, style as StyleProp<ViewStyle>]}>
        <Text style={styles.singlePetText}>{pets[0]!.name}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.nativeList, style as StyleProp<ViewStyle>]}>
      {pets.map((pet) => {
        const isSelected = pet.id === selectedPetId;

        return (
          <Pressable
            key={pet.id}
            disabled={disabled}
            onPress={() => onSelect(pet.id)}
            style={[styles.nativeOption, isSelected && styles.nativeOptionSelected]}
          >
            <Text
              style={[
                styles.nativeOptionText,
                isSelected && styles.nativeOptionTextSelected,
              ]}
            >
              {pet.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  singlePet: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  singlePetText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  nativeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  nativeOption: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
  },
  nativeOptionSelected: {
    borderColor: "#4f46e5",
    backgroundColor: "#eef2ff",
  },
  nativeOptionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
  },
  nativeOptionTextSelected: {
    color: "#4f46e5",
    fontWeight: "600",
  },
});
