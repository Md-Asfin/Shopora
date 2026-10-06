package com.shopora.service;

import com.shopora.dto.AddressRequest;
import com.shopora.dto.AddressResponse;
import com.shopora.entity.Address;
import com.shopora.entity.User;
import com.shopora.exception.BadRequestException;
import com.shopora.exception.ResourceNotFoundException;
import com.shopora.repository.AddressRepository;
import com.shopora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<AddressResponse> getUserAddresses(Long userId) {
        return addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(userId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AddressResponse getAddressById(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id: " + addressId));
        return mapToResponse(address);
    }

    @Transactional
    public AddressResponse createAddress(Long userId, AddressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Address> existing = addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(userId);
        boolean makeDefault = request.isDefault() || existing.isEmpty();

        if (makeDefault && !existing.isEmpty()) {
            existing.forEach(a -> {
                a.setDefault(false);
                addressRepository.save(a);
            });
        }

        Address address = Address.builder()
                .user(user)
                .addressType(request.getAddressType())
                .recipientName(request.getRecipientName())
                .phone(request.getPhone())
                .streetAddress(request.getStreetAddress())
                .city(request.getCity())
                .state(request.getState())
                .postalCode(request.getPostalCode())
                .country(request.getCountry() != null ? request.getCountry() : "India")
                .isDefault(makeDefault)
                .build();

        Address saved = addressRepository.save(address);
        return mapToResponse(saved);
    }

    @Transactional
    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id: " + addressId));

        if (request.isDefault() && !address.isDefault()) {
            List<Address> existing = addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(userId);
            existing.forEach(a -> {
                a.setDefault(false);
                addressRepository.save(a);
            });
            address.setDefault(true);
        }

        address.setAddressType(request.getAddressType());
        address.setRecipientName(request.getRecipientName());
        address.setPhone(request.getPhone());
        address.setStreetAddress(request.getStreetAddress());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPostalCode(request.getPostalCode());
        if (request.getCountry() != null) {
            address.setCountry(request.getCountry());
        }

        Address saved = addressRepository.save(address);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteAddress(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id: " + addressId));
        addressRepository.delete(address);
    }

    @Transactional
    public AddressResponse setDefaultAddress(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id: " + addressId));

        List<Address> existing = addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(userId);
        existing.forEach(a -> {
            a.setDefault(false);
            addressRepository.save(a);
        });

        address.setDefault(true);
        Address saved = addressRepository.save(address);
        return mapToResponse(saved);
    }

    private AddressResponse mapToResponse(Address a) {
        return AddressResponse.builder()
                .id(a.getId())
                .addressType(a.getAddressType())
                .recipientName(a.getRecipientName())
                .phone(a.getPhone())
                .streetAddress(a.getStreetAddress())
                .city(a.getCity())
                .state(a.getState())
                .postalCode(a.getPostalCode())
                .country(a.getCountry())
                .isDefault(a.isDefault())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
