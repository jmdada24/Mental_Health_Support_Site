document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const addClientBtn = document.getElementById('addClientBtn');
    const clientTableBody = document.getElementById('clientTableBody');
    const searchInput = document.getElementById('clientSearch');
    const statusFilter = document.getElementById('statusFilter');
    const clientFormModal = document.getElementById('clientFormModal');
    const editClientModal = document.getElementById('editClientModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const addClientForm = document.getElementById('addClientForm');
    const editClientForm = document.getElementById('editClientForm');

    let clients = [];
    let filteredClients = [];

    // Fetch clients from server with error handling
    async function fetchClients() {
        try {
            const response = await fetch('../php/CRUDClient/fetch_clients.php', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                console.error('Server error:', data.error);
                return;
            }
            
            // Update clients array and render
            clients = Array.isArray(data) ? data : [];
            filteredClients = [...clients];
            renderClients();
            
            console.log('Fetched clients:', clients); // Debug log
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        }
    }

    function filterClients() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value.toLowerCase();

        filteredClients = clients.filter(client => {
            const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
            const matchesSearch = fullName.includes(searchTerm) ||
                                client.email.toLowerCase().includes(searchTerm) ||
                                client.contact.toLowerCase().includes(searchTerm);
            
            const matchesStatus = statusValue === 'all' || 
                                client.status.toLowerCase() === statusValue;

            return matchesSearch && matchesStatus;
        });

        renderClients();
    }

    function renderClients() {
        if (!Array.isArray(filteredClients)) {
            console.error('filteredClients is not an array:', filteredClients);
            return;
        }

        const tableContent = filteredClients.map(client => `
            <tr>
                <td>${client.firstName} ${client.lastName}</td>
                <td>${client.email}</td>
                <td>${client.contact}</td>
                <td><span class="client-status status-${client.status.toLowerCase()}">${client.status}</span></td>
                <td>
                    <button class="btn btn-primary" onclick="editClient('${client.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteClient('${client.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        clientTableBody.innerHTML = tableContent || '<tr><td colspan="5">No clients found</td></tr>';
    }

    // Modal functions
    function toggleModal(modal) {
        modal.classList.toggle('active');
        if (modal === clientFormModal && !modal.classList.contains('active')) {
            addClientForm.reset();
        }
    }

    // Event Listeners
    addClientBtn.addEventListener('click', () => toggleModal(clientFormModal));
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            toggleModal(modal);
        });
    });

    searchInput.addEventListener('input', filterClients);
    statusFilter.addEventListener('change', filterClients);

    // Edit client handler
    window.editClient = function(id) {
        const client = clients.find(c => c.id === id);
        if (!client) {
            console.error('Client not found:', id);
            return;
        }

        // Populate edit form
        document.getElementById('editClientId').value = client.id;
        document.getElementById('editFirstName').value = client.firstName;
        document.getElementById('editLastName').value = client.lastName;
        document.getElementById('editUsername').value = client.username;
        document.getElementById('editEmail').value = client.email;
        document.getElementById('editContact').value = client.contact;
        document.getElementById('editPronouns').value = client.pronouns;
        document.getElementById('editAddress').value = client.address;
        document.getElementById('editStatus').value = client.status.toLowerCase();

        toggleModal(editClientModal);
    };

    // Delete client handler
    window.deleteClient = async function(id) {
        if (!confirm('Are you sure you want to delete this client?')) return;

        try {
            const response = await fetch('../php/CRUDClient/delete_client.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });

            const data = await response.json();
            
            if (data.success) {
                await fetchClients(); // Refresh the list
                alert('Client deleted successfully');
            } else {
                alert(data.error || 'Failed to delete client');
            }
        } catch (error) {
            console.error('Error deleting client:', error);
            alert('Failed to delete client');
        }
    };

    // Form submission handlers
    editClientForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        try {
            const response = await fetch('../php/CRUDClient/update_client.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (data.success) {
                await fetchClients();
                toggleModal(editClientModal);
                alert('Client updated successfully');
            } else {
                alert(data.error || 'Failed to update client');
            }
        } catch (error) {
            console.error('Error updating client:', error);
            alert('Failed to update client');
        }
    });

    // Initial fetch
    fetchClients();
    
    // Refresh client list periodically (every 30 seconds)
    setInterval(fetchClients, 30000);
});