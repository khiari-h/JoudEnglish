import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e293b',
  },
  detailSection: {
    marginBottom: 15,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#334155',
  },
  detailText: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  exampleItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#e0e0e0',
  },
  exampleSpoken: {
    fontSize: 15,
    color: '#0f172a',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  exampleContext: {
    fontSize: 14,
    color: '#64748b',
  },
  closeModalButton: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
});

export default styles;