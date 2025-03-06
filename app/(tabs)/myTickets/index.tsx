"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";

import QRCode from "react-native-qrcode-svg";

// Sample ticket data
const ticketData = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    date: "2024-07-15T18:00:00",
    qrData: "TICKET-SMF-001-2024",
    status: "valid",
  },
  {
    id: "2",
    eventName: "Tech Conference 2024",
    date: "2024-06-22T09:00:00",
    qrData: "TICKET-TECH-002-2024",
    status: "valid",
  },
  {
    id: "3",
    eventName: "Comedy Night",
    date: "2024-05-10T20:00:00",
    qrData: "TICKET-COMEDY-003-2024",
    status: "used",
  },
  {
    id: "4",
    eventName: "Art Exhibition",
    date: "2024-04-05T10:00:00",
    qrData: "TICKET-ART-004-2024",
    status: "expired",
  },
  {
    id: "5",
    eventName: "Basketball Game",
    date: "2024-08-12T19:30:00",
    qrData: "TICKET-BBALL-005-2024",
    status: "valid",
  },
];

const TicketScreen = () => {
  const [filter, setFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  // Get current date for filtering
  const currentDate = new Date();

  // Filter tickets based on selected filter
  const filteredTickets = ticketData.filter((ticket) => {
    const ticketDate = new Date(ticket.date);

    if (filter === "upcoming") {
      return ticketDate > currentDate;
    } else if (filter === "past") {
      return ticketDate < currentDate;
    }
    return true; // 'all' filter
  });

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US");
  };

  // Get status color based on ticket status
  const getStatusColor = (status) => {
    switch (status) {
      case "valid":
        return "#4CAF50"; // Green
      case "used":
        return "#2196F3"; // Blue
      case "expired":
        return "#F44336"; // Red
      default:
        return "#9E9E9E"; // Grey
    }
  };

  // Show QR code modal
  const showQRCode = (ticket) => {
    setSelectedTicket(ticket);
    setQrModalVisible(true);
  };

  // Render individual ticket item
  const renderTicketItem = ({ item }) => (
    <View style={styles.ticketItem}>
      <View style={styles.ticketHeader}>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.dateText}>{formatDate(item.date)}</Text>

      <TouchableOpacity
        style={[
          styles.qrButton,
          {
            backgroundColor: "#1d4ed8",
          },
        ]}
        onPress={() => showQRCode(item)}
      >
        <Text style={styles.qrButtonText}>Show Ticket</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>My Tickets</Text>

      {/* Filter options */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "upcoming" && styles.activeFilter,
          ]}
          onPress={() => setFilter("upcoming")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "upcoming" && styles.activeFilterText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "past" && styles.activeFilter,
          ]}
          onPress={() => setFilter("past")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "past" && styles.activeFilterText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ticket list */}
      {filteredTickets.length > 0 ? (
        <FlatList
          data={filteredTickets}
          renderItem={renderTicketItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tickets found</Text>
        </View>
      )}

      {/* QR Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={qrModalVisible}
        onRequestClose={() => setQrModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTicket && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedTicket.eventName}
                </Text>
                <Text style={styles.modalDate}>
                  {formatDate(selectedTicket.date)}
                </Text>

                <View style={styles.qrContainer}>
                  <QRCode value={selectedTicket.qrData} size={200} />
                </View>

                <View
                  style={[
                    styles.modalStatusBadge,
                    { backgroundColor: getStatusColor(selectedTicket.status) },
                  ]}
                >
                  <Text style={styles.modalStatusText}>
                    {selectedTicket.status.toUpperCase()}
                  </Text>
                </View>

                <Text style={styles.ticketIdText}>
                  Ticket ID: {selectedTicket.qrData}
                </Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setQrModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#EEEEEE",
  },
  activeFilter: {
    backgroundColor: "#1d4ed8",
  },
  filterText: {
    color: "#757575",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  ticketItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  qrButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  qrButtonText: {
    color: "white",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  modalStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 16,
  },
  modalStatusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  ticketIdText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "500",
  },
});

export default TicketScreen;
