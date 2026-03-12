import { tws } from "@/src/utils/tws";

import React from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "@/src/theme";

export interface TimelineImageViewerProps {
    images: string[];
    initialIndex?: number;
    onClose: () => void;
}

export function TimelineImageViewer({
    images,
    initialIndex = 0,
    onClose
}: TimelineImageViewerProps) {
    const { width } = Dimensions.get("window");

    if (!images.length) return null;

    return (
        <Modal
            visible={true}
            transparent={true}
            onRequestClose={onClose}
            animationType="fade"
        >
            <View style={tws("flex-1 bg-black/90 justify-center items-center")}>
                <TouchableOpacity
                    style={tws("absolute top-16 right-6 z-10 p-2")}
                    onPress={onClose}
                >
                    <Ionicons name="close" size={32} color="#fff" />
                </TouchableOpacity>

                <FlatList
                    data={images}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    initialScrollIndex={initialIndex}
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={tws("justify-center items-center", { width })}>
                            <Image
                                source={{ uri: item }}
                                style={tws("w-full h-full") as any}
                                resizeMode="contain"
                            />
                        </View>
                    )}
                />

                {images.length > 1 && (
                    <View style={tws("absolute bottom-12 bg-black/50 px-4 py-2 rounded-3xl self-center")}>
                        <Text
                            style={tws("text-white text-sm", { fontFamily: fonts.medium })}
                        >
                            Số lượng: {images.length} ảnh
                        </Text>
                    </View>
                )}
            </View>
        </Modal>
    );
}
